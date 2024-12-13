import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
class VehicleService {
  private apiUrl = 'http://localhost:3000/vehicles'; 

  constructor(private http: HttpClient) {}

  // Obtener todos los vehículos
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  // Obtener un vehículo por ID
  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo vehículo
  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, {
      marca: vehicle.marca,
      modelo: vehicle.modelo,
      anio: vehicle.anio,
      color: vehicle.color,
      ubicacion: vehicle.ubicacion,
      placa: vehicle.placa
    });
  }
  // Actualizar un vehículo
  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    console.log(vehicle.id);
    return this.http.put<Vehicle>(`${this.apiUrl}/${vehicle.id}`, vehicle);
  }

  // Eliminar un vehículo
  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

export default VehicleService