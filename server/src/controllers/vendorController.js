const Vendor = require("../models/vendorModel");

const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);

    res.status(201).json({
      success: true,
      message: "Vendor created successfully",
      vendor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create vendor",
      error: error.message,
    });
  }
};

const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();

    res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch vendors",
      error: error.message,
    });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch vendor",
      error: error.message,
    });
  }
};

const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendor updated successfully",
      vendor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update vendor",
      error: error.message,
    });
  }
};
module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
};