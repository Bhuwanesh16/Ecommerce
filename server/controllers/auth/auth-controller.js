const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const JWT_SECRET = process.env.JWT_SECRET || "CLIENT_SECRET_KEY";



// Helper function for validation
const validateRegistration = (userName, email, password) => {
  if (!userName || !email || !password) {
    return { isValid: false, message: 'All fields are required' };
  }

  if (typeof userName === 'string' && userName.trim().length < 2) {
    return { isValid: false, message: 'Username must be at least 2 characters' };
  }

  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }

  return { isValid: true };
};

const registerUser = async (req, res) => {
  console.log('Registration attempt', { body: req.body });
  let { userName, email, password, role, adminSecret } = req.body;

  // Trim and sanitize inputs
  userName = typeof userName === 'string' ? userName.trim() : userName;
  email = typeof email === 'string' ? email.trim().toLowerCase() : email;
  role = typeof role === 'string' ? role.trim().toLowerCase() : 'user';
  if (!['user', 'admin'].includes(role)) {
    role = 'user';
  }
  console.log('Sanitized registration data:', { userName, email, role });

  // Optional admin signup protection (set ADMIN_REGISTRATION_SECRET env var to require a secret)
  const ADMIN_SECRET = process.env.ADMIN_REGISTRATION_SECRET;
  if (role === 'admin' && ADMIN_SECRET) {
    if (adminSecret !== ADMIN_SECRET) {
      console.warn('Unauthorized admin signup attempt:', { email });
      return res.status(403).json({ success: false, message: 'Admin registration requires a valid secret' });
    }
  }

  // Input validation
  const validation = validateRegistration(userName, email, password);
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: validation.message
    });
  }

  try {
    // Check for existing user (optimized to run in parallel)
    const [existingEmail, existingUserName] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ userName })
    ]);

    if (existingEmail || existingUserName) {
      const message = existingEmail
        ? "User already exists with this email"
        : "Username already taken";
      return res.status(400).json({ success: false, message });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      role
    });

    // Generate token immediately after registration
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
        email: newUser.email,
        userName: newUser.userName
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set cookie and return response
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (e) {
    console.error("Registration Error:", e && e.stack ? e.stack : e);

    if (e && e.code === 11000) {
      const field = Object.keys(e.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? e.message : undefined
    });
  }
};

// ... (keep your existing loginUser, logoutUser, authMiddleware functions)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }


    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );


    // Set cookie (dev: secure=false). Also return token in body to support clients where cookies are blocked.
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: 'lax' });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        userName: user.userName,
        email: user.email,
        role: user.role,
        id: user._id,
      },
    });
  } catch (e) {
    console.error("Login Error:", e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  // Prefer cookie token, fallback to Authorization header
  let token = req.cookies.token;
  let tokenSource = 'cookie';

  if (!token) {
    // Try Authorization header
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
      tokenSource = 'header';
    }
  }

  if (!token) {
    // DEBUG: log cookies and auth header when token is missing to help diagnose cross-site cookie issues
    console.log('Auth: missing token. Cookies:', req.cookies, 'AuthHeader:', req.headers['authorization']);
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Fetch latest user from DB so role changes take effect immediately
    const user = await User.findById(decoded.id).select('-password').lean();
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorised user!" });
    }
    // DEBUG: log id, role and token source to help trace role checks (remove in production)
    console.log(`Auth: user=${user._id} role=${user.role} (source=${tokenSource})`);
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

// admin role middleware
const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorised user!" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden: admin access required" });
  }
  next();
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware, adminMiddleware }; 
