const express = require("express");

const {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
} = require("../controllers/vendorController");

const router = express.Router();

router.post("/", createVendor);
router.get("/", getVendors);
router.get("/:id", getVendorById);
router.put("/:id", updateVendor);

module.exports = router;