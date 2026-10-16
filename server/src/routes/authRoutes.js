const express = require("express");

const {
  registerCustomer,
  loginCustomer,
} = require("../controllers/authController");

const router = express.Router();

// =====================================================
// CUSTOMER REGISTRATION
// =====================================================

router.post("/register", registerCustomer);


// =====================================================
// CUSTOMER LOGIN
// =====================================================

router.post("/login", loginCustomer);


module.exports = router;