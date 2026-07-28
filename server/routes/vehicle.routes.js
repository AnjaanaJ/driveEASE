const express = require("express");
const router = express.Router();

const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  updateVehicleMaintenance,
  getVehicleHistory,
} = require("../controllers/vehicle.controller");

router.post("/", createVehicle);
router.get("/", getVehicles);
router.get("/:id", getVehicleById);
router.get("/:id/history", getVehicleHistory);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
router.put("/:id/maintenance", updateVehicleMaintenance);


module.exports = router;