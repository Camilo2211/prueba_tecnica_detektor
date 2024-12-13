import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Group {
  id?: number;
  nombre: string;
  descripcion: string;
  vehicles: any[]
}

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private apiUrl = 'http://localhost:3000/groups'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener todos los grupos
  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  // Obtener un grupo por ID
  getGroupById(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo grupo
  createGroup(grupo: Group): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, grupo);
  }

  addVehicleToGroup(groupId: number, vehicleId: number): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/${groupId}/vehicles/${vehicleId}`, { groupId, vehicleId });
  }

  getVehiclesByGroup(): Observable<{ groups: any }> {
    return this.http.get<{ groups: any }>(`${this.apiUrl}/vehicles/get`);
  }

  updateVehicleGroup(grupo_id: number, vehicleId: number, new_group_id: number): Observable<any> {
    return this.http.put<{ groups: any }>(`${this.apiUrl}/vehicles/${vehicleId}`, {grupo_id, new_group_id});
  }

  deleteVehicleGroup(grupo_id: number, vehicleId: number): Observable<any> {
    return this.http.delete<{ groups: any }>(`${this.apiUrl}/${grupo_id}/delete-vehicle/${vehicleId}`,);
  }
}