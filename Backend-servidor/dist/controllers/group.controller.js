"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
const database_1 = require("../database");
//funcion asincrona para buscar todos los grupos
class GroupController {
    getAllGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query("SELECT * FROM grupos");
                res.json(result.rows);
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching groups", error });
            }
        });
    }
    //funcion asincrona para buscar grupos por id
    getGroupById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = req.params.id;
                const groupResult = yield database_1.pool.query("SELECT * FROM grupos WHERE id = $1", [groupId]);
                if (groupResult.rows.length === 0) {
                    res.status(404).json({ message: "Group not found" });
                    return;
                }
                // Obtiene todos los vehículos asociados a un grupo específico mediante un JOIN entre las tablas 'vehiculos' y 'vehiculos_grupos', filtrando por 'grupo_id'.
                const vehiclesResult = yield database_1.pool.query("SELECT v.* FROM vehiculos v JOIN vehiculos_grupos gv ON v.id = gv.vehiculo_id WHERE gv.grupo_id = $1", [groupId]);
                const group = Object.assign(Object.assign({}, groupResult.rows[0]), { vehicles: vehiclesResult.rows });
                res.json(group);
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching group", error });
            }
        });
    }
    //creacion de grupos
    createGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const { describe } = req.body;
                const result = yield database_1.pool.query("INSERT INTO grupos (nombre, descripcion) VALUES ($1, $2) RETURNING *", [name, describe]);
                res.status(201).json(result.rows[0]);
            }
            catch (error) {
                res.status(500).json({ message: "Error creating group", error });
            }
        });
    }
    addVehicleToGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupId, vehicleId } = req.params;
                // Verifica si el grupo existe
                const groupResult = yield database_1.pool.query("SELECT * FROM grupos WHERE id = $1", [groupId]);
                if (groupResult.rows.length === 0) {
                    res.status(404).json({ message: "Group not found" });
                    return;
                }
                // Verifica si el vehículo existe
                const vehicleResult = yield database_1.pool.query("SELECT * FROM grupos WHERE id = $1", [vehicleId]);
                if (vehicleResult.rows.length === 0) {
                    res.status(404).json({ message: "Vehicle not found" });
                    return;
                }
                // Agrega relación entre grupo y vehículo
                yield database_1.pool.query("INSERT INTO vehiculos_grupos (vehiculo_id, grupo_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [vehicleId, groupId]);
                res.json({ message: "Vehicle added to group successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error adding vehicle to group", error });
            }
        });
    }
    findVehicles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query(`
  SELECT 
    g.id AS group_id, 
    g.nombre AS group_name, 
    JSON_AGG(
      JSONB_BUILD_OBJECT(
        'vehicle_id', v.id, 
        'brand', v.marca, 
        'model', v.modelo,
		    'vehicle_group_id', vg.id 
      )
    ) AS vehicles 
  FROM 
    grupos g 
  LEFT JOIN 
    vehiculos_grupos vg ON g.id = vg.grupo_id 
  LEFT JOIN 
    vehiculos v ON v.id = vg.vehiculo_id 
  GROUP BY 
    g.id, g.nombre`);
                res.json({
                    groups: result
                });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching groups", error });
            }
        });
    }
    updateMoveGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { grupo_id, new_group_id } = req.body;
                const result = yield database_1.pool.query("UPDATE vehiculos_grupos SET grupo_id = $1 WHERE grupo_id =$2 and vehiculo_id = $3 RETURNING *", [new_group_id, grupo_id, req.params.id]);
                // 👇 Agregamos la respuesta que faltaba
                res.status(200).json(result.rows[0]);
            }
            catch (error) {
                res.status(500).json({
                    message: "Error updating vehicle",
                    error: error instanceof Error ? error.message : error
                });
            }
        });
    }
    deleteVehicleGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query("DELETE FROM vehiculos_grupos WHERE grupo_id =$1 and vehiculo_id = $2", [
                    req.params.grupo_id, req.params.id,
                ]);
                if (result.rowCount === 0) {
                    res.status(404).json({ message: "Vehicle not found" });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting vehicle", error });
            }
        });
    }
}
exports.GroupController = GroupController;
exports.default = GroupController;
