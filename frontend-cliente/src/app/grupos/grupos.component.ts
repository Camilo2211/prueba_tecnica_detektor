import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GruposService, Group } from '../services/grupo.service';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './grupos.component.html',
  styleUrls: []
})
export class GruposComponent implements OnInit {
  grupoForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  groups: Group[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private gruposService: GruposService,
    private router: Router
  ) {
    this.grupoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      describe: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.cargarGrupos();
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() { return this.grupoForm.controls; }

  cargarGrupos() {
    this.gruposService.getAllGroups()
      .subscribe({
        next: (response) => {
          console.log('Grupos cargados:', response); 
          this.groups = response;
        },
        error: (error) => {
          console.error('Error completo al cargar grupos:', error);
          this.errorMessage = error.message || 'No se pudieron cargar los grupos.';
          
          // Si es un error de HTTP, muestra más detalles
          if (error.status) {
            this.errorMessage += ` (Status: ${error.status})`;
          }
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    // Verificar si el formulario es válido
    if (this.grupoForm.invalid) {
      return;
    }

    this.loading = true;

    // Crear el grupo
    this.gruposService.createGroup(this.grupoForm.value)
      .subscribe({
        next: (response) => {
          // Manejar respuesta exitosa
          console.log('Grupo creado:', response);
          this.groups.push(response);
          this.grupoForm.reset();
          this.submitted = false;
        },
        error: (error) => {
          // Manejar errores
          console.error('Error al crear grupo:', error);
          this.errorMessage = 'No se pudo crear el grupo. Intente nuevamente.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}