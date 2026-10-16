const express = require("express");
const cors = require("cors");

const vendorRoutes = require("./routes/vendorRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


// =====================================================
// ROOT
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "EventEase API is running",
  });
});


// =====================================================
// VENDOR ROUTES
// =====================================================

app.use(
  "/api/vendors",
  vendorRoutes
);


// =====================================================
// AUTH ROUTES
// =====================================================

app.use(
  "/api/auth",
  authRoutes
);


module.exports = app;