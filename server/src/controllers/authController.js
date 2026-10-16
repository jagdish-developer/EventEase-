const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");

// =====================================================
// CUSTOMER REGISTRATION
// =====================================================

const registerCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      password,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const existingCustomer = await Customer.findOne({
      email: email.toLowerCase(),
    });

    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      city,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Customer account created successfully.",
      customer: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        city: customer.city,
      },
    });
  } catch (error) {
    console.error("Customer Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating account.",
    });
  }
};


// =====================================================
// CUSTOMER LOGIN
// =====================================================

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // -------------------------------------------------
    // Check required fields
    // -------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // -------------------------------------------------
    // Find customer
    // -------------------------------------------------

    const customer = await Customer.findOne({
      email: email.toLowerCase(),
    });

    if (!customer) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // -------------------------------------------------
    // Compare password
    // -------------------------------------------------

    const isPasswordCorrect = await bcrypt.compare(
      password,
      customer.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // -------------------------------------------------
    // Create JWT
    // -------------------------------------------------

    const token = jwt.sign(
      {
        id: customer._id,
        email: customer.email,
        role: "customer",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // -------------------------------------------------
    // Success response
    // -------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      customer: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        city: customer.city,
      },
    });
  } catch (error) {
    console.error("Customer Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while logging in.",
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  registerCustomer,
  loginCustomer,
};