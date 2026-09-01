const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const requireRole = require("../middleware/requireRole");

const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  updateVehicleMaintenance,
  getVehicleHistory,
} = require("../controllers/vehicle.controller");

// Vehicle Management - Admin only
router.post("/", verifyToken, requireRole("admin"), createVehicle);

router.get("/", verifyToken, requireRole("admin"), getVehicles);

router.get("/:id", verifyToken, requireRole("admin"), getVehicleById);

router.get(
  "/:id/history",
  verifyToken,
  requireRole("admin"),
  getVehicleHistory
);

router.put("/:id", verifyToken, requireRole("admin"), updateVehicle);

router.delete("/:id", verifyToken, requireRole("admin"), deleteVehicle);

router.put(
  "/:id/maintenance",
  verifyToken,
  requireRole("admin"),
  updateVehicleMaintenance
);

module.exports = router;