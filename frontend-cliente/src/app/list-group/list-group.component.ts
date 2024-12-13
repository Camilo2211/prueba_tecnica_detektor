import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para *ngFor y otras directivas comunes
import {
  CdkDropListGroup,
  CdkDropList,
  CdkDragDrop,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { Group, GruposService } from '../services/grupo.service';
import VehicleService from '../services/vehicle.service';

@Component({
  selector: 'app-list-group',
  standalone: true,
  imports: [
    CommonModule, // Necesario para *ngFor y otras directivas
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
})
export class ListGroupComponent implements OnInit {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  vehicles: any[] = []
  groups: any[] = [];
  errorMessage = '';

  constructor(
    private gruposService: GruposService,
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.cargarVehiculos()
    this.cargarGrupos()
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

  cargarGrupos() {
    this.gruposService.getVehiclesByGroup()
      .subscribe({
        next: (response) => {
          console.log(response)
          this.groups = response.groups.rows.map((item: any) => ({ ...item, vehicles: item.vehicles.map((vehicle: any) => ({ ...vehicle, modelo: vehicle.model, marca: vehicle.brand })) }));
          console.log(this.groups)
        },
        error: (error) => {
          this.errorMessage = error.message || 'No se pudieron cargar los grupos.';
          if (error.status) {
            this.errorMessage += ` (Status: ${error.status})`;
          }
        }
      });
  }


  addVehicleToGroup(groupID: number, vehicleId: number) {
    this.gruposService.addVehicleToGroup(groupID, vehicleId)
      .subscribe({
        next: (response) => {
        },
        error: (error) => {
          this.errorMessage = error.message || 'No se pudieron cargar los grupos.';
          if (error.status) {
            this.errorMessage += ` (Status: ${error.status})`;
          }
        }
      });
  }

  changeGroupVehicle(groupId: number, vehicleId: number, newGroupId: number) {
    this.gruposService.updateVehicleGroup(groupId, vehicleId, newGroupId)
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          this.errorMessage = error.message || 'No se pudieron cargar los grupos.';
          if (error.status) {
            this.errorMessage += ` (Status: ${error.status})`;
          }
        }
      });
  }

  deleteFromGroup(groupId: string, vehicleId: string) {
    let newData = [...this.groups]
    const groupIdx = newData.findIndex((group: any) => group.group_id === Number(groupId))
    newData[groupIdx].vehicles = newData[groupIdx].vehicles.filter((vehicle: any) => vehicle.vehicle_id !== Number(vehicleId))
    this.groups = newData
    this.gruposService.deleteVehicleGroup(Number(groupId), Number(vehicleId))
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          this.errorMessage = error.message || 'No se pudieron cargar los grupos.';
          if (error.status) {
            this.errorMessage += ` (Status: ${error.status})`;
          }
        }
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    const vehicleId = event.item.element.nativeElement.id
    const newGroupId = event.container.id
    const groupId = event.previousContainer.id

    const existVehicle = event.container.data.find((item: any) => {
      return item.vehicle_id === Number(vehicleId)
    })

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (existVehicle) {
      return
    } else if (event.previousContainer.id === 'vehicles') {
      this.addVehicleToGroup(Number(newGroupId), Number(vehicleId))
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      this.changeGroupVehicle(Number(groupId), Number(vehicleId), Number(newGroupId))
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
