import { Component } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import * as e from 'express';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  selectedPhoto!: File;

  email!: string;
  password!: string;

  listaFiestas: any;
  listaExtra: any;

  email1: any;
  sePuedeEditar:boolean = false;

  id!:string

  ubicaciones: Array<string> = []
  telefonos: Array<number> = []
  nombresEmpresa: Array<string> = []

  nombres: Array<string> = []
  descripciones: Array<string> = []
  telefonos1: Array<number> = []

  constructor(
    private http: HttpClientService,
    private router: Router
  ){  }
  logueado: boolean = false;

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedPhoto = fileList[0];
      console.log(this.selectedPhoto)
    }
  }

  ngOnInit(){
    if(localStorage.getItem("token")){
      this.logueado = false
    }
    else{
      this.logueado = true
    }
    this.http.getFiestas().subscribe((response:any) => {
      console.log(response)
    } , error => {
      console.log(error);
    })
    this.http.FiestaPorUsuario(localStorage.getItem("email")).subscribe((data:any) => {

      this.listaFiestas = JSON.parse(JSON.stringify(data))

      this.listaFiestas.forEach((element: any) => {

        this.ubicaciones.push(element.ubicacion)
        this.telefonos.push(element.telefono)
        this.nombresEmpresa.push(element.nombreEmpresa)

      });

     } , error => {
        console.log(error);
      })
    this.http.ExtraPorUsuario(localStorage.getItem("email")).subscribe((data:any) => {

      this.listaExtra = JSON.parse(JSON.stringify(data))

      console.log(this.listaExtra)
      this.listaExtra.forEach((element:any) => {

        this.nombres.push(element.nombre)
        this.telefonos1.push(element.telefono)
        this.descripciones.push(element.descripcion)

      });
       } , error => {
          console.log(error);
        })
  }
  terminar(){
   localStorage.removeItem("token")
   localStorage.removeItem("email")
   this.logueado = false
  }
  login(){

    const body = {
      email: this.email,
      password: this.password,
    }
    if (!this.email || !this.password) {
      alert("Please fill in all required fields.");
      return;
  }
    this.http.login(body).subscribe((response:any) => {
      localStorage.setItem("token", JSON.parse(JSON.stringify(response)))
      localStorage.setItem("email", body.email)
      console.log(localStorage.getItem("token"))
      this.router.navigate(['/main'])
      alert("login exitoso")
    }, error => {
      console.log(error);
      alert("Usuario o contraseña incorrectos")
    })
  }

  obtenerId(id:string){
    console.log(id)
    this.id = id
    console.log(this.id)
  }

  editar(id:string){
    this.obtenerId(id)
    if(this.sePuedeEditar== false){
      this.sePuedeEditar = true
    }else{
      this.sePuedeEditar = true
    }
  }

  editarFiestas(id: number){
    const formData = new FormData();
    formData.append('fiesta', JSON.stringify({
      ubicacion: this.ubicaciones[id],
      telefono: this.telefonos[id],
      email: localStorage.getItem("email"),
      nombreEmpresa: this.nombresEmpresa[id],
      imagen: "",
    }));
    formData.append("image", this.selectedPhoto)
    this.http.editarFiesta(this.id, formData).subscribe((response:any) => {
      console.log(response)
      alert("Fiesta modificada")
      this.sePuedeEditar = false
      this.ngOnInit()
    },error => {
      console.log(error);
    })
  }
  editarExtra(ind:number){
    const formData = new FormData();
    formData.append('extra', JSON.stringify({
      nombre: this.nombres[ind],
      telefono: this.telefonos1[ind],
      descripcion: this.descripciones[ind]
    }));
    formData.append("image", this.selectedPhoto)

    this.http.editarExtra(this.id, formData).subscribe((response:any) => {
      console.log(response)
      alert("Servicio modificado")
      this.sePuedeEditar = false
      this.ngOnInit()
    },error => {
      console.log(error);
    })
  }
}
