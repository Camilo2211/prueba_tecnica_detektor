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
exports.VehicleController = void 0;
const database_1 = require("../database");
// Obtiene todos los vehículos
class VehicleController {
    getAllVehicles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query("SELECT * FROM vehiculos");
                res.json(result.rows);
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching vehicles", error });
            }
        });
    }
    // Obtiene el vehiculo consultado por el id 
    getVehicleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query("SELECT * FROM vehiculos WHERE id = $1", [
                    req.params.id,
                ]);
                if (result.rows.length === 0) {
                    res.status(404).json({ message: "Vehicle not found" });
                    return;
                }
                res.json(result.rows[0]);
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching vehicle", error });
            }
        });
    }
    //realiza la inserción del vehiculo con su correspondientes atributos
    createVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { marca, modelo, anio, color, ubicacion, placa } = req.body;
                const result = yield database_1.pool.query("INSERT INTO vehiculos (marca, modelo, anio, color, ubicacion, placa) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [marca, modelo, anio, color, ubicacion, placa]);
                res.status(201).json(result.rows[0]);
            }
            catch (error) {
                console.error("Error creating vehicle:", error);
                res.status(500).json({
                    message: "Error creating vehicle",
                    error: error instanceof Error ? error.message : error
                });
            }
        });
    }
    //realiza la actualización del vehiculo con su correspondientes atributos
    updateVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { marca, modelo, anio, color, ubicacion, placa } = req.body;
                const result = yield database_1.pool.query("UPDATE vehiculos SET marca = $1, modelo = $2, anio = $3, color = $4, ubicacion = $5, placa = $6 WHERE id = $7 RETURNING *", [marca, modelo, anio, color, ubicacion, placa, req.params.id]);
                if (result.rows.length === 0) {
                    res.status(404).json({ message: "Vehicle not found" });
                    return;
                }
                res.json(result.rows[0]);
            }
            catch (error) {
                res.status(500).json({ message: "Error updating vehicle", error });
            }
        });
    }
    //realiza la eliminación del vehiculo por medio del id
    deleteVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query("DELETE FROM vehiculos WHERE id = $1", [
                    req.params.id,
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
exports.VehicleController = VehicleController;
