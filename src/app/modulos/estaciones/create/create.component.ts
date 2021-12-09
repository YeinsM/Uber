import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import { EstacionesService } from 'src/app/servicios/estaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private estacionService: EstacionesService,
    private router: Router) { }

  fgValidacion = this.fb.group({
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    coordenada_x: ['', [Validators.required]],
    coordenada_y: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  store(){
    let estacion = new EstacionModelo();
    estacion.nombre = this.fgValidacion.controls["nombre"].value;
    estacion.direccion = this.fgValidacion.controls["direccion"].value;
    estacion.coordenada_x = this.fgValidacion.controls["coordenada_x"].value;
    estacion.coordenada_y = this.fgValidacion.controls["coordenada_y"].value;
    estacion.tipo = this.fgValidacion.controls["tipo"].value;

    this.estacionService.store(estacion).subscribe((data: EstacionModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/estaciones/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
