import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule 
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import VehicleService from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>{{ esEdicion ? 'Editar' : 'Nuevo' }} Vehículo</h2>
      
      <form [formGroup]="vehicleForm" (ngSubmit)="guardarVehiculo()">
        <div class="form-group mt-1">
          <label>Marca</label>
          <input 
            type="text" 
            formControlName="marca" 
            class="form-control"
          >
        </div>
        
        <div class="form-group mt-1">
          <label>Modelo</label>
          <input 
            type="text" 
            formControlName="modelo" 
            class="form-control"
          >
        </div>
        
        <div class="form-group mt-1">
          <label>Año</label>
          <input 
            type="number" 
            formControlName="anio" 
            class="form-control"
          >
        </div>
        
        <div class="form-group mt-1">
          <label>Color</label>
          <input 
            type="text" 
            formControlName="color" 
            class="form-control"
          >
        </div>

        <div class="form-group mt-1">
          <label>Ubicación</label>
          <input 
            type="text" 
            formControlName="ubicacion" 
            class="form-control"
          >
        </div>
        
        <div class="form-group mt-1">
          <label>Placa</label>
          <input 
            type="text" 
            formControlName="placa" 
            class="form-control"
          >
        </div>
        
        <button type="submit" class="btn btn-primary mt-3" [disabled]="vehicleForm.invalid">
          {{ esEdicion ? 'Actualizar' : 'Crear' }} Vehículo
        </button>
      </form>
    </div>
  `
})
export class VehicleFormComponent implements OnInit {
  vehicleForm: FormGroup;
  esEdicion = false;
  vehiculoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.vehicleForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      color: ['', Validators.required],
      ubicacion: ['', Validators.required],
      placa: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.esEdicion = true;
        this.vehiculoId = +id;
        this.cargarVehiculo(+id);
      }
    });
  }

  cargarVehiculo(id: number): void {
    this.vehicleService.getVehicleById(id).subscribe({
      next: (vehiculo) => {
        this.vehicleForm.patchValue(vehiculo);
      },
      error: (error) => {
        console.error('Error al cargar vehículo', error);
      }
    });
  }
  guardarVehiculo(): void {
    if (this.vehicleForm.valid) {
      const vehiculo: Vehicle = {
        id: this.vehiculoId || undefined, // Asegúrate de incluir el ID si estás en edición
        marca: this.vehicleForm.get('marca')?.value,
        modelo: this.vehicleForm.get('modelo')?.value,
        anio: this.vehicleForm.get('anio')?.value || new Date().getFullYear(),
        color: this.vehicleForm.get('color')?.value,
        ubicacion: this.vehicleForm.get('ubicacion')?.value,
        placa: this.vehicleForm.get('placa')?.value
      };
  
      if (this.esEdicion && this.vehiculoId) {
        // Actualización de vehículo
        this.vehicleService.updateVehicle(vehiculo).subscribe({
          next: () => {
            this.router.navigate(['/vehiculos']);
          },
          error: (error) => {
            console.error('Error al actualizar vehículo', error);
          }
        });
      } else {
        // Creación de nuevo vehículo
        this.vehicleService.createVehicle(vehiculo).subscribe({
          next: () => {
            this.router.navigate(['/vehiculos']);
          },
          error: (error) => {
            console.error('Error al crear vehículo', error);
          }
        });
      }
    }
  }  
}