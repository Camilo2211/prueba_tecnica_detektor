import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group, GruposService } from '../services/grupo.service';
import VehicleService from '../services/vehicle.service';
import { ListGroupComponent } from "../list-group/list-group.component";

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, ListGroupComponent],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent{}
