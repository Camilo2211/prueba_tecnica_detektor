import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: [] 
})


export class HomeComponent {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
