import { ServicioModelo } from '../modelos/servicio.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
     }
  
    getAll(): Observable<ServicioModelo[]> {
    return this.http.get<ServicioModelo[]>(`${this.url}/servicios`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  store(servicio: ServicioModelo): Observable<ServicioModelo> {
    return this.http.post<ServicioModelo>(`${this.url}/servicios`, {
      fecha: servicio.fecha,
      hora_inicio: servicio.hora_inicio,
      hora_fin: servicio.hora_fin,
      nombre_conductor: servicio.nombre_conductor,
      placa_vehiculo: servicio.placa_vehiculo,
      dinero_recogido: servicio.dinero_recogido
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  update(servicio: ServicioModelo): Observable<ServicioModelo> {
    return this.http.patch<ServicioModelo>(`${this.url}/servicios/${servicio.id}`, {
      fecha: servicio.fecha,
      hora_inicio: servicio.hora_inicio,
      hora_fin: servicio.hora_fin,
      nombre_conductor: servicio.nombre_conductor,
      placa_vehiculo: servicio.placa_vehiculo,
      dinero_recogido: servicio.dinero_recogido
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
    
  }

  delete(id: string): Observable<ServicioModelo[]> {
    return this.http.delete<ServicioModelo[]>(`${this.url}/servicios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<ServicioModelo> {
    return this.http.get<ServicioModelo>(`${this.url}/servicios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}
