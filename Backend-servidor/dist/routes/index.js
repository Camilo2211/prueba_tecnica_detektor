"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicle_controller_1 = require("../controllers/vehicle.controller");
const group_controller_1 = require("../controllers/group.controller");
const router = (0, express_1.Router)();
// Instancias de los controladores
const vehicleController = new vehicle_controller_1.VehicleController();
const groupController = new group_controller_1.GroupController();
// Rutas para vehículos
router.get('/vehicles', (req, res) => vehicleController.getAllVehicles(req, res));
router.get('/vehicles/:id', (req, res) => vehicleController.getVehicleById(req, res));
router.post('/vehicles', (req, res) => vehicleController.createVehicle(req, res));
router.put('/vehicles/:id', (req, res) => vehicleController.updateVehicle(req, res));
router.delete('/vehicles/:id', (req, res) => vehicleController.deleteVehicle(req, res));
// Rutas para grupos
router.get('/groups', (req, res) => groupController.getAllGroups(req, res));
router.get('/groups/:id', (req, res) => groupController.getGroupById(req, res));
router.get('/groups/vehicles/get', (req, res) => groupController.findVehicles(req, res));
router.post('/groups', (req, res) => groupController.createGroup(req, res));
// Relación vehículos y grupos
router.post('/groups/:groupId/vehicles/:vehicleId', (req, res) => groupController.addVehicleToGroup(req, res));
router.put('/groups/vehicles/:id', (req, res) => groupController.updateMoveGroup(req, res));
router.delete('/groups/:grupo_id/delete-vehicle/:id', (req, res) => groupController.deleteVehicleGroup(req, res));
exports.default = router;
