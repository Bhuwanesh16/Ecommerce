const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRouter=require('./routes/auth/auth-routes');


mongoose.set('strictQuery', true); // Optional: avoid deprecation warning

mongoose.connect("mongodb+srv://bhuwaneshmanivel:Bhuwanesh16@cluster0.vkhlzol.mongodb.net/ecommerce?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
})
.then(() => {
  console.log(" Connected to MongoDB");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));