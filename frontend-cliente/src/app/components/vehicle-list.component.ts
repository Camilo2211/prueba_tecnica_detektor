import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import VehicleService  from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div>
        <h2>Lista de Vehículos</h2>
        <button routerLink="/vehiculos/nuevo" class="btn btn-primary mb-3 me-3">
          Nuevo Vehículo
        </button>
        <button routerLink="/" class="btn btn-dark mb-3">
          Atras
        </button>
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Color</th>
            <th>Ubicacion</th>
            <th>Placa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let vehicle of vehicles">
            <td>{{ vehicle.marca }}</td>
            <td>{{ vehicle.modelo }}</td>
            <td>{{ vehicle.anio }}</td>
            <td>{{ vehicle.color }}</td>
            <td>{{ vehicle.ubicacion }}</td>
            <td>{{ vehicle.placa }}</td>
            <td class="d-flex ">
              <button 
                [routerLink]="['/vehiculos/editar', vehicle.id]" 
                class="btn btn-warning me-2 btn-sm"
              >
                Editar
              </button>
              <button 
                (click)="eliminarVehiculo(vehicle.id)" 
                class="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (vehiculos) => {
        this.vehicles = vehiculos;
      },
      error: (error) => {
        console.error('Error al cargar vehículos', error);
      }
    });
  }

  eliminarVehiculo(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de eliminar este vehículo?')) {
      this.vehicleService.deleteVehicle(id).subscribe({
        next: () => {
          this.cargarVehiculos(); // Recargar lista
        },
        error: (error) => {
          console.error('Error al eliminar vehículo', error);
        }
      });
    }
  }
}