import { Component, OnInit } from '@angular/core';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  listaUsuarios: UsuarioModelo[] = []

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private servicioService: ServicioService,
    private router: Router) { }

    fgValidacion = this.fb.group({
      fecha: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      placa_vehiculo: ['', [Validators.required]],
      nombre_conductor: ['', [Validators.required]],
      dinero_recogido: ['', [Validators.required]]
    });
  

  ngOnInit(): void {
    this.getUsuarios()
  }

  store(){
    let servicio = new ServicioModelo();
    new Date (servicio.fecha = this.fgValidacion.controls["fecha"].value).toISOString;
    servicio.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
    servicio.hora_fin = this.fgValidacion.controls["hora_fin"].value;
    servicio.placa_vehiculo = this.fgValidacion.controls["placa_vehiculo"].value;
    servicio.nombre_conductor = this.fgValidacion.controls["nombre_conductor"].value;
    servicio.dinero_recogido = this.fgValidacion.controls["dinero_recogido"].value;
    
    this.servicioService.store(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getUsuarios(){
    this.usuarioService.getAll().subscribe((data: UsuarioModelo[]) => {
      this.listaUsuarios = data
      console.log(data)
      }
    )}
}
