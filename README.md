# 🛍️ E-Commerce Platform

<div align="center">

**A Modern Full-Stack E-Commerce Application**

[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-1.9-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![PayPal](https://img.shields.io/badge/PayPal-Integration-00457C?logo=paypal&logoColor=white)](https://developer.paypal.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)

*Complete e-commerce solution with customer shopping experience and comprehensive admin management*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture)

</div>

---

## 🌟 Overview

A production-ready, full-stack e-commerce platform built with modern web technologies. This application provides a seamless shopping experience for customers and powerful management tools for administrators, complete with secure authentication, payment processing, and cloud-based media storage.

### ✨ Key Features

#### 🛒 For Customers
- **Product Browsing** - Explore products with advanced filtering, sorting, and search
- **Product Details** - Detailed product pages with images, descriptions, and pricing
- **Shopping Cart** - Real-time cart management with quantity controls
- **Address Management** - Save and manage multiple shipping addresses
- **Secure Checkout** - Streamlined checkout process with address selection
- **PayPal Integration** - Safe and reliable online payment processing
- **Order Tracking** - View complete order history and detailed order information
- **User Account** - Manage profile, addresses, and account settings

#### 👨‍💼 For Administrators
- **Dashboard Analytics** - Real-time metrics for revenue, orders, and products
- **Product Management** - Full CRUD operations for product catalog
- **Image Management** - Cloud-based product image uploads via Cloudinary
- **Order Management** - View and update order statuses (pending → delivered)
- **Feature Controls** - Manage homepage banners and featured products
- **Inventory Control** - Track stock levels and product availability

#### 🔒 Security & Performance
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access** - Separate customer and admin permissions
- **Protected Routes** - Route guards for authenticated and authorized access
- **Responsive Design** - Mobile-first, fully responsive UI
- **Optimized Performance** - Fast loading with Vite bundling

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                            │
│                    (React + Vite + Redux)                        │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Shopping   │  │    Admin     │  │     Auth     │          │
│  │     View     │  │     View     │  │     View     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  Redux Store                                                     │
│  ├── Auth         ├── Cart         ├── Products                 │
│  ├── Orders       ├── Address      └── Admin                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                         REST API
                              │
┌─────────────────────────────────────────────────────────────────┐
│                        Server Layer                              │
│                    (Node.js + Express)                           │
│                                                                  │
│  ┌────────────────────────────────────────────────────┐         │
│  │              Middleware & Authentication            │         │
│  │              (JWT, CORS, Body Parser)              │         │
│  └────────────────────────────────────────────────────┘         │
│                                                                  │
│  Routes & Controllers                                            │
│  ├── /api/auth       - Authentication & user management         │
│  ├── /api/shop       - Products, cart, orders, addresses        │
│  └── /api/admin      - Admin product & order management         │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
    ┌─────────▼─────┐  ┌─────▼──────┐  ┌────▼──────┐
    │   MongoDB     │  │ Cloudinary │  │  PayPal   │
    │   Database    │  │   Media    │  │  Payment  │
    └───────────────┘  └────────────┘  └───────────┘
```

### Data Flow

```
Customer Journey:
Browse → Add to Cart → Checkout → Payment → Order Confirmation

Admin Journey:
Login → Dashboard → Manage Products/Orders → Update Status
```

---

## 🛠️ Tech Stack

### Frontend (`/client`)

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | 18.x |
| **Vite** | Build tool & dev server | 5.x |
| **Redux Toolkit** | State management | Latest |
| **React Router** | Client-side routing | 6.x |
| **JavaScript** | Programming language | ES6+ |
| **Custom UI Components** | Design system | - |
| **CSS** | Styling (Tailwind-style) | - |

**Redux State Management:**
- `auth-slice` - User authentication, tokens, roles
- `cart-slice` - Shopping cart items, quantities, totals
- `products-slice` - Product listings, filters, sorting
- `order-slice` - Order creation, history, details
- `address-slice` - User address management
- `admin/products-slice` - Admin product CRUD

### Backend (`/server`)

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime environment | 18.x |
| **Express** | Web framework | 4.x |
| **MongoDB** | NoSQL database | 6.x |
| **Mongoose** | ODM for MongoDB | Latest |
| **Cloudinary** | Image hosting & CDN | Latest |
| **PayPal SDK** | Payment processing | Latest |
| **JWT** | Authentication tokens | Latest |
| **bcrypt** | Password hashing | Latest |

### Database Models

```
User
├── email, password (hashed)
├── role (admin/customer)
├── name, timestamps

Product
├── title, description, price
├── category, images (Cloudinary URLs)
├── stock, isFeatured

Cart
├── user reference
├── product references, quantities
├── totals

Order
├── user, items, address
├── payment info, status
├── timestamps

Address
├── user reference
├── name, phone, street, city, zip
├── country, isDefault
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **MongoDB** (v6.x or higher, local or Atlas)
- **Git**

**External Services:**
- **Cloudinary Account** - For image storage ([Sign up](https://cloudinary.com/))
- **PayPal Developer Account** - For payment processing ([Sign up](https://developer.paypal.com/))

---

### 📦 Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-platform.git
cd ecommerce-platform
```

#### 2. Install Dependencies

This project uses **npm workspaces** for managing client and server dependencies.

```bash
# Install all dependencies (both client and server)
npm install

# Or install separately
cd client && npm install
cd ../server && npm install
```

#### 3. Environment Configuration

**Backend Configuration (`/server/.env`):**

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PayPal
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

**Frontend Configuration (`/client/.env`):**

```env
VITE_API_URL=http://localhost:5000
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

#### 4. Database Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:6
```

**Option B: MongoDB Atlas**
1. Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `.env`

---

### ▶️ Running the Application

#### Development Mode

**Using npm workspaces (recommended):**

```bash
# From root directory - runs both client and server concurrently
npm run dev
```

**Or run separately:**

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

**Access the application:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

#### Production Build

```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../server
npm start
```

---

## 📁 Project Structure

```
ecommerce-platform/
│
├── client/                          # Frontend Application
│   ├── src/
│   │   ├── components/              # React Components
│   │   │   ├── admin-view/          # Admin Components
│   │   │   │   ├── layout.jsx       # Admin layout wrapper
│   │   │   │   ├── header.jsx       # Admin header
│   │   │   │   ├── sidebar.jsx      # Admin sidebar nav
│   │   │   │   ├── product-tile.jsx # Admin product card
│   │   │   │   ├── image-upload.jsx # Image upload widget
│   │   │   │   └── order-details.jsx
│   │   │   │
│   │   │   ├── shopping-view/       # Customer Components
│   │   │   │   ├── layout.jsx       # Shopping layout
│   │   │   │   ├── header.jsx       # Main navbar
│   │   │   │   ├── product-tile.jsx # Product card
│   │   │   │   ├── product-details.jsx
│   │   │   │   ├── filter.jsx       # Product filters
│   │   │   │   ├── cart-wrapper.jsx
│   │   │   │   ├── cart-items-content.jsx
│   │   │   │   ├── address.jsx      # Address management
│   │   │   │   ├── address-card.jsx
│   │   │   │   └── checkout.jsx
│   │   │   │
│   │   │   ├── auth/                # Authentication
│   │   │   │   └── layout.jsx       # Auth layout
│   │   │   │
│   │   │   ├── common/              # Shared Components
│   │   │   │   ├── check-auth.jsx   # Route guard
│   │   │   │   └── form.jsx         # Form utilities
│   │   │   │
│   │   │   └── ui/                  # UI Primitives
│   │   │       ├── button.jsx
│   │   │       ├── input.jsx
│   │   │       ├── select.jsx
│   │   │       ├── dialog.jsx
│   │   │       ├── card.jsx
│   │   │       ├── table.jsx
│   │   │       ├── tabs.jsx
│   │   │       ├── avatar.jsx
│   │   │       ├── badge.jsx
│   │   │       ├── skeleton.jsx
│   │   │       ├── sheet.jsx
│   │   │       └── textarea.jsx
│   │   │
│   │   ├── pages/                   # Page Components
│   │   │   ├── admin-view/
│   │   │   │   ├── dashboard.jsx    # Admin dashboard
│   │   │   │   ├── products.jsx     # Product management
│   │   │   │   ├── orders.jsx       # Order management
│   │   │   │   └── features.jsx     # Feature controls
│   │   │   │
│   │   │   ├── shopping-view/
│   │   │   │   ├── home.jsx         # Homepage
│   │   │   │   ├── listing.jsx      # Product listing
│   │   │   │   ├── checkout.jsx     # Checkout page
│   │   │   │   ├── account.jsx      # User account
│   │   │   │   ├── orders.jsx       # Order history
│   │   │   │   ├── order-details.jsx
│   │   │   │   ├── payment-success.jsx
│   │   │   │   └── paypal-return.jsx
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── login.jsx
│   │   │   │   └── register.jsx
│   │   │   │
│   │   │   ├── not-found/
│   │   │   │   └── index.jsx        # 404 page
│   │   │   │
│   │   │   └── unauth-page/
│   │   │       └── index.jsx        # Unauthorized page
│   │   │
│   │   ├── store/                   # Redux Store
│   │   │   ├── store.js             # Store configuration
│   │   │   ├── auth-slice/
│   │   │   │   └── index.js
│   │   │   ├── shop/
│   │   │   │   ├── address-slice/
│   │   │   │   ├── cart-slice/
│   │   │   │   ├── order-slice/
│   │   │   │   └── products-slice/
│   │   │   └── admin/
│   │   │       └── products-slice/
│   │   │
│   │   ├── config/
│   │   │   └── index.js             # API URLs, env config
│   │   │
│   │   ├── lib/
│   │   │   └── utils.js             # Utility functions
│   │   │
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   │
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── server/                          # Backend Application
│   ├── controllers/                 # Route Controllers
│   │   ├── auth/
│   │   │   └── auth-controller.js   # Register, login, profile
│   │   ├── shop/
│   │   │   ├── product-controller.js
│   │   │   ├── cart-controller.js
│   │   │   ├── address-controller.js
│   │   │   └── order-controller.js
│   │   └── admin/
│   │       ├── product-controller.js
│   │       └── order-controller.js
│   │
│   ├── routes/                      # API Routes
│   │   ├── auth/
│   │   │   └── auth-routes.js
│   │   ├── shop/
│   │   │   ├── product-routes.js
│   │   │   ├── cart-routes.js
│   │   │   ├── address-routes.js
│   │   │   └── order-routes.js
│   │   └── admin/
│   │       ├── product-routes.js
│   │       └── order-routes.js
│   │
│   ├── models/                      # Mongoose Models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── Address.js
│   │
│   ├── helpers/                     # Helper Functions
│   │   ├── cloudinary.js            # Image upload/delete
│   │   └── paypal.js                # Payment processing
│   │
│   ├── middleware/                  # Custom Middleware
│   │   ├── auth.js                  # JWT verification
│   │   └── admin.js                 # Admin role check
│   │
│   ├── scripts/                     # Utility Scripts
│   │   ├── find-bad-users.js        # Data cleanup
│   │   ├── find-user.js             # User lookup
│   │   ├── fix-user-index.js        # Index repair
│   │   └── register-test-harness.js # Test registration
│   │
│   ├── server.js                    # Express app entry
│   └── package.json
│
├── package.json                     # Root workspace config
└── README.md                        # This file
```

---

## 🔐 Authentication & Authorization

### User Roles

| Role | Access Level |
|------|--------------|
| **Customer** | Browse products, manage cart, place orders, manage profile |
| **Admin** | Full access to product management, order management, dashboard |

### Authentication Flow

```
1. User Registration/Login
   ↓
2. Server validates credentials
   ↓
3. JWT token generated and returned
   ↓
4. Client stores token (localStorage/Redux)
   ↓
5. Token included in subsequent requests
   (Authorization: Bearer <token>)
   ↓
6. Server validates token on protected routes
```

### Protected Routes

**Frontend Route Guards:**
- `check-auth.jsx` - Validates authentication and role
- Redirects unauthenticated users to login
- Redirects unauthorized users to unauth page

**Backend Middleware:**
- `auth.js` - Verifies JWT token
- `admin.js` - Checks admin role

---

## 📡 API Endpoints

### Authentication (`/api/auth`)

```
POST   /register                - Register new user
POST   /login                   - User login
POST   /logout                  - User logout
GET    /profile                 - Get current user profile
```

### Shop - Products (`/api/shop/products`)

```
GET    /                        - Get all products (with filters)
GET    /:id                     - Get single product
GET    /search                  - Search products
```

### Shop - Cart (`/api/shop/cart`)

```
GET    /                        - Get user's cart
POST   /add                     - Add item to cart
PUT    /update                  - Update item quantity
DELETE /remove/:id              - Remove item from cart
DELETE /clear                   - Clear entire cart
```

### Shop - Addresses (`/api/shop/address`)

```
GET    /                        - Get user's addresses
POST   /add                     - Add new address
PUT    /update/:id              - Update address
DELETE /delete/:id              - Delete address
PATCH  /default/:id             - Set default address
```

### Shop - Orders (`/api/shop/order`)

```
POST   /create                  - Create new order
GET    /list                    - Get user's orders
GET    /:id                     - Get order details
POST   /capture                 - Capture PayPal payment
```

### Admin - Products (`/api/admin/products`)

```
POST   /add                     - Create new product
GET    /                        - Get all products
PUT    /edit/:id                - Update product
DELETE /delete/:id              - Delete product
POST   /upload-image            - Upload product image
```

### Admin - Orders (`/api/admin/orders`)

```
GET    /                        - Get all orders
GET    /:id                     - Get order details
PUT    /update/:id              - Update order status
```

---

## 💳 Payment Integration

### PayPal Setup

1. **Create PayPal Developer Account**
   - Visit [developer.paypal.com](https://developer.paypal.com/)
   - Create a sandbox account

2. **Get API Credentials**
   - Navigate to Apps & Credentials
   - Create a new app
   - Copy Client ID and Secret

3. **Configure Environment Variables**
   ```env
   PAYPAL_MODE=sandbox
   PAYPAL_CLIENT_ID=your_client_id
   PAYPAL_CLIENT_SECRET=your_client_secret
   ```

### Payment Flow

```
1. User proceeds to checkout
   ↓
2. PayPal order created on server
   ↓
3. User redirected to PayPal
   ↓
4. User completes payment
   ↓
5. Redirected to /paypal-return
   ↓
6. Server captures payment
   ↓
7. Order status updated
   ↓
8. User sees success page
```

---

## 🖼️ Image Management

### Cloudinary Setup

1. **Create Cloudinary Account**
   - Visit [cloudinary.com](https://cloudinary.com/)
   - Sign up for free account

2. **Get API Credentials**
   - Go to Dashboard
   - Copy Cloud Name, API Key, and API Secret

3. **Configure Environment Variables**
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Image Upload Flow

```
Admin uploads product image
   ↓
Image sent to Cloudinary API
   ↓
Cloudinary returns secure URL
   ↓
URL saved in product document
   ↓
Images served via Cloudinary CDN
```

---

## 🧪 Testing

### Backend Testing

```bash
cd server

# Run tests (if configured)
npm test

# Test registration flow
node scripts/register-test-harness.js
```

### Frontend Testing

```bash
cd client

# Run tests (if configured)
npm test

# Run linter
npm run lint
```

---

## 🚢 Deployment

### Backend Deployment

#### Option 1: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
# ... set all other env variables

# Deploy
git push heroku main
```

#### Option 2: DigitalOcean App Platform

1. Connect your GitHub repository
2. Select Node.js environment
3. Set environment variables
4. Deploy

#### Option 3: VPS (Ubuntu)

```bash
# Install Node.js and MongoDB
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs mongodb

# Clone repository
git clone your-repo-url
cd ecommerce-platform/server

# Install dependencies
npm install

# Install PM2
npm install -g pm2

# Start server with PM2
pm2 start server.js --name ecommerce-api
pm2 save
pm2 startup
```

### Frontend Deployment

#### Option 1: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel --prod
```

#### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd client
npm run build
netlify deploy --prod --dir=dist
```

#### Option 3: AWS S3 + CloudFront

```bash
# Build
cd client
npm run build

# Upload dist/ folder to S3
# Configure CloudFront distribution
```

### Environment Variables for Production

**Backend:**
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=strong_random_secret
CLIENT_URL=https://your-frontend-domain.com
```

**Frontend:**
```env
VITE_API_URL=https://your-api-domain.com
```

---

## 🔧 Utility Scripts

### Server Scripts

Located in `/server/scripts/`

**Find User:**
```bash
node scripts/find-user.js email@example.com
```

**Find Problematic Users:**
```bash
node scripts/find-bad-users.js
```

**Fix User Index:**
```bash
node scripts/fix-user-index.js
```

**Test Registration:**
```bash
node scripts/register-test-harness.js
```

---

## 📊 Features Breakdown

### Customer Shopping Flow

```
Home Page
  ↓
Browse Products (with filters)
  ↓
View Product Details
  ↓
Add to Cart
  ↓
View/Update Cart
  ↓
Manage Addresses
  ↓
Checkout
  ↓
PayPal Payment
  ↓
Order Confirmation
  ↓
View Order History
```

### Admin Management Flow

```
Admin Login
  ↓
Dashboard (Analytics)
  ↓
Manage Products
  ├── Add New Product
  ├── Upload Images
  ├── Edit Product
  └── Delete Product
  ↓
Manage Orders
  ├── View All Orders
  ├── Update Order Status
  └── View Order Details
  ↓
Manage Features
  └── Set Featured Products
```

---

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Error

```bash
# Check MongoDB is running
sudo systemctl status mongod

# Or restart MongoDB
sudo systemctl restart mongod

# Verify connection string in .env
```

#### CORS Errors

```javascript
// Check CORS configuration in server.js
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```

#### PayPal Integration Issues

```bash
# Verify PayPal credentials
# Check PAYPAL_MODE is set to 'sandbox' for testing
# Ensure PAYPAL_CLIENT_ID matches frontend env variable
```

#### Cloudinary Upload Fails

```bash
# Verify Cloudinary credentials
# Check file size limits
# Ensure proper CORS configuration
```

#### Port Already in Use

```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style

- **Frontend**: Follow ESLint configuration
- **Backend**: Use consistent indentation (2 spaces)
- **Commits**: Use conventional commit messages
- **Components**: One component per file
- **Testing**: Write tests for new features

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool
- [Express](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Cloudinary](https://cloudinary.com/) - Media management
- [PayPal](https://developer.paypal.com/) - Payment processing

---

## 🗺️ Roadmap

### Planned Features

- [ ] **Product Reviews & Ratings** - Customer feedback system
- [ ] **Wishlist** - Save products for later
- [ ] **Email Notifications** - Order confirmations and updates
- [ ] **Advanced Search** - Full-text search with Elasticsearch
- [ ] **Discount Codes** - Coupon and promotion system
- [ ] **Inventory Alerts** - Low stock notifications
- [ ] **Multi-Currency Support** - International pricing
- [ ] **Order Tracking** - Real-time delivery status
- [ ] **Mobile App** - React Native version
- [ ] **Analytics Dashboard** - Advanced reporting for admins
- [ ] **Customer Support Chat** - Live chat integration
- [ ] **Social Login** - Google/Facebook authentication

---

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ecommerce-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ecommerce-platform/discussions)
- **Email**: support@ecommerce.com

---

<div align="center">

**Built with ❤️ using modern web technologies**

⭐ Star this repository if you find it useful!

[Report Bug](https://github.com/yourusername/ecommerce-platform/issues) · 
[Request Feature](https://github.com/yourusername/ecommerce-platform/issues) · 
[Documentation](https://github.com/yourusername/ecommerce-platform/wiki)

</div>
