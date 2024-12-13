import { Request, Response } from "express";
import { pool } from "../database";

// Obtiene todos los vehículos
export class VehicleController {
  async getAllVehicles(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("SELECT * FROM vehiculos");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicles", error });
    }
  }
// Obtiene el vehiculo consultado por el id 
  async getVehicleById(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("SELECT * FROM vehiculos WHERE id = $1", [
        req.params.id,
      ]);
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Vehicle not found" });
        return;
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicle", error });
    }
  }
//realiza la inserción del vehiculo con su correspondientes atributos
async createVehicle(req: Request, res: Response): Promise<void> {
  try {
    const { marca, modelo, anio, color, ubicacion, placa } = req.body;
    const result = await pool.query(
      "INSERT INTO vehiculos (marca, modelo, anio, color, ubicacion, placa) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [marca, modelo, anio, color, ubicacion, placa]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ 
      message: "Error creating vehicle", 
      error: error instanceof Error ? error.message : error 
    });
  }
}
//realiza la actualización del vehiculo con su correspondientes atributos
  async updateVehicle(req: Request, res: Response): Promise<void> {
    try {
      const { marca, modelo, anio, color, ubicacion, placa } = req.body;
      const result = await pool.query(
        "UPDATE vehiculos SET marca = $1, modelo = $2, anio = $3, color = $4, ubicacion = $5, placa = $6 WHERE id = $7 RETURNING *",
        [marca, modelo, anio, color, ubicacion, placa, req.params.id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Vehicle not found" });
        return;
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Error updating vehicle", error });
    }
  }
//realiza la eliminación del vehiculo por medio del id
  async deleteVehicle(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("DELETE FROM vehiculos WHERE id = $1", [
        req.params.id,
      ]);
      if (result.rowCount === 0) {
        res.status(404).json({ message: "Vehicle not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting vehicle", error });
    }
  }
}
