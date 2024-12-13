import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'frontend_prueba';
}
