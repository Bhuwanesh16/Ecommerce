const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');



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
  let { userName, email, password } = req.body;

  // Trim and sanitize inputs
  userName = typeof userName === 'string' ? userName.trim() : userName;
  email = typeof email === 'string' ? email.trim().toLowerCase() : email;

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
      password: hashedPassword
    });

    // Generate token immediately after registration
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        userName: newUser.userName
      },
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
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
        email: newUser.email
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
      "CLIENT_SECRET_KEY",
      { expiresIn: "1h" }
    );


    res.cookie("token", token, { httpOnly: true, secure: false });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
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
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
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
