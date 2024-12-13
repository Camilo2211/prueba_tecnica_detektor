import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VehicleListComponent } from './components/vehicle-list.component';
import { VehicleFormComponent } from './components/vehicle-form.component';
import { GruposComponent } from './grupos/grupos.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'vehiculos', component: VehicleListComponent },
  { path: 'vehiculos/nuevo', component: VehicleFormComponent },
  { path: 'vehiculos/editar/:id', component: VehicleFormComponent },
  { path: 'crear_grupo', component: GruposComponent },
  { path: 'asignar-grupo', component: TaskManagerComponent },
];