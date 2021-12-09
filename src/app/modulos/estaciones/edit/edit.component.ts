import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import { EstacionesService } from 'src/app/servicios/estaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private estacionService: EstacionesService,
    private router: Router,
    private route: ActivatedRoute) { }

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    coordenada_x: ['', [Validators.required]],
    coordenada_y: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  id: string = ''


  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string) {
    this.estacionService.getWithId(id).subscribe((data: EstacionModelo) => {
      console.log("ID...:" +this.fgValidacion.controls["id"])
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombre"].setValue(data.nombre);
      this.fgValidacion.controls["direccion"].setValue(data.direccion);
      this.fgValidacion.controls["coordenada_x"].setValue(data.coordenada_x);
      this.fgValidacion.controls["coordenada_y"].setValue(data.coordenada_y);
      this.fgValidacion.controls["tipo"].setValue(data.tipo);
    })
  }

  edit() {
    let estacion = new EstacionModelo();
    estacion.id = this.fgValidacion.controls["id"].value;
    estacion.nombre = this.fgValidacion.controls["nombre"].value;
    estacion.direccion = this.fgValidacion.controls["direccion"].value;
    estacion.coordenada_x = this.fgValidacion.controls["coordenada_x"].value;
    estacion.coordenada_y = this.fgValidacion.controls["coordenada_y"].value;
    estacion.tipo = this.fgValidacion.controls["tipo"].value;
    this.estacionService.update(estacion).subscribe((data: EstacionModelo) => {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/estaciones/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }


}
