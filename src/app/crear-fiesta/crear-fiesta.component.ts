import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-crear-fiesta',
  templateUrl: './crear-fiesta.component.html',
  styleUrls: ['./crear-fiesta.component.css']
})
export class CrearFiestaComponent {
  aux: boolean = false;
  constructor(   private http: HttpClientService,
    private router: Router) { }
    ubicacion!: string;
    telefono!: number;
    nombreEmpresa!: string;
    descripcion!: string;
    nombre!: string;
    selectedPhoto!: File;
    telefono2!: number;
    nombre2!: string;
    selectedPhoto2!: File;

    onFileChange(event: any) {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        this.selectedPhoto = fileList[0];
        console.log(this.selectedPhoto)
      }
    }
    cambiarFiesta(){
    this.aux= false;

    }
    cambiarAgregado(){
      this.aux= true;
    }
   crearParty(){
    if (!this.ubicacion || !this.telefono || !this.nombreEmpresa) {
        alert("Please fill in all required fields.")
        return;
    }
    const formData = new FormData();
    formData.append('fiesta', JSON.stringify({
      ubicacion: this.ubicacion,
      telefono: this.telefono,
      email: localStorage.getItem("email"),
      nombreEmpresa: this.nombreEmpresa,
      imageURL: "",
    }));
    formData.append('image', this.selectedPhoto);
  this.http.crearFiesta(formData).subscribe((response:any) => {
    console.log(response)
    this.router.navigate(['/main'])
    alert("Fiesta creada")
  },error => {
    console.log(error);
  })
  }


  crearServicio(){
    if (!this.descripcion || !this.telefono2 || !this.nombre2) {
        alert("Please fill in all required fields.")
        return;
    }
    const formData = new FormData();
    formData.append('extra', JSON.stringify({
      nombre: this.nombre2,
      email: localStorage.getItem("email"),
      telefono: this.telefono2,
      descripcion: this.descripcion,
      imageURL: ""
    }));
    console.log(formData)
    formData.append('image', this.selectedPhoto);
  this.http.crearServicio(formData).subscribe((response:any) => {
    console.log(response)
    this.router.navigate(['/main'])
    alert("servicio creado")
  },error => {
    console.log(error);
  })
  }
}
