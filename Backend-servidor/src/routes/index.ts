import { Router, Request, Response } from "express";
import { VehicleController } from "../controllers/vehicle.controller";
import { GroupController } from "../controllers/group.controller";

const router = Router();

// Instancias de los controladores
const vehicleController = new VehicleController();
const groupController = new GroupController();

// Rutas para vehículos
router.get('/vehicles', (req: Request, res: Response) => vehicleController.getAllVehicles(req, res));
router.get('/vehicles/:id', (req: Request, res: Response) => vehicleController.getVehicleById(req, res));
router.post('/vehicles', (req: Request, res: Response) => vehicleController.createVehicle(req, res));
router.put('/vehicles/:id', (req: Request, res: Response) => vehicleController.updateVehicle(req, res));
router.delete('/vehicles/:id', (req: Request, res: Response) => vehicleController.deleteVehicle(req, res));

// Rutas para grupos
router.get('/groups', (req: Request, res: Response) => groupController.getAllGroups(req, res));
router.get('/groups/:id', (req: Request, res: Response) => groupController.getGroupById(req, res));
router.get('/groups/vehicles/get', (req: Request, res: Response) => groupController.findVehicles(req, res));
router.post('/groups', (req: Request, res: Response) => groupController.createGroup(req, res));

// Relación vehículos y grupos
router.post('/groups/:groupId/vehicles/:vehicleId', (req: Request, res: Response) => groupController.addVehicleToGroup(req, res));
router.put('/groups/vehicles/:id',(req: Request, res: Response) => groupController.updateMoveGroup(req, res));
router.delete('/groups/:grupo_id/delete-vehicle/:id', (req: Request, res: Response) => groupController.deleteVehicleGroup(req, res));

export default router;
