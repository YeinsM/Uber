import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import Swal from 'sweetalert2';

import { EstacionModelo } from 'src/app/modelos/estacion.model';
import { EstacionesService } from 'src/app/servicios/estaciones.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  listaEstaciones: EstacionModelo[] = []

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private estacionesService: EstacionesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.getEstaciones()
    this.buscarRegistro(this.id);
  }

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    tiempo_estimado: ['', [Validators.required]],
  });

  id: string=''

  buscarRegistro(id: string) {
    this.rutaService.getWithId(id).subscribe((data: RutaModelo) => {
      console.log("ID...:" +this.fgValidacion.controls["id"])
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["origen"].setValue(data.origen);
      this.fgValidacion.controls["destino"].setValue(data.destino);
      this.fgValidacion.controls["tiempo_estimado"].setValue(data.tiempo_estimado);
    })
  }

  edit() {
    let ruta = new RutaModelo();
    ruta.id = this.fgValidacion.controls["id"].value;
    ruta.origen = this.fgValidacion.controls["origen"].value;
    ruta.destino = this.fgValidacion.controls["destino"].value;
    ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value;
    this.rutaService.update(ruta).subscribe((data: RutaModelo) => {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/estaciones/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

  getEstaciones(){
    this.estacionesService.getAll().subscribe((data: EstacionModelo[]) => {
      this.listaEstaciones = data
      console.log(data)
      }
    )}
}
