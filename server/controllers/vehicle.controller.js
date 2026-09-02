const Vehicle = require("../models/Vehicle");

// Create Vehicle
const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Vehicle
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Vehicle
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Vehicle
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Vehicle Maintenance Log
const updateVehicleMaintenance = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const { maintenanceDate, description, cost } = req.body;

    // Check that maintenance date is provided
    if (!maintenanceDate) {
      return res.status(400).json({
        success: false,
        message: "Maintenance date is required",
      });
    }

    const date = new Date(maintenanceDate);

    // Check that the date is valid
    if (isNaN(date.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid maintenance date",
      });
    }

    // Compare only the date portion so today's date is allowed
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // Maintenance date cannot be in the future
    if (date > today) {
      return res.status(400).json({
        success: false,
        message: "Maintenance date cannot be in the future",
      });
    }

    vehicle.maintenanceLog.push({
      maintenanceDate: date,
      description,
      cost,
    });

    await vehicle.save();

    res.status(200).json({
      success: true,
      message: "Maintenance log updated successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Vehicle Maintenance History
const getVehicleHistory = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      data: vehicle.maintenanceLog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  updateVehicleMaintenance,
  getVehicleHistory,
};