import { Component } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import * as e from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email!: string;
  password!: string;

  listaFiestas: any;
  listaExtra: any;

  email1: any;
  sePuedeEditar:boolean = false;

  id!:string
  ubicacion!: string
  telefono!: number
  nombreEmpresa!: string

  nombre!:string
  descripcion!:any
  telefono1!:number
  constructor(
    private http: HttpClientService,
    private router: Router
  ){  }
  logueado: boolean = false;
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
      console.log(this.listaExtra)
     } , error => {
        console.log(error);
      })
    this.http.ExtraPorUsuario(localStorage.getItem("email")).subscribe((data:any) => {
      this.listaExtra = JSON.parse(JSON.stringify(data))

      console.log(this.listaExtra)
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

  editarFiestas(){
    const body = {
      ubicacion: this.ubicacion,
      telefono: this.telefono,
      nombreEmpresa: this.nombreEmpresa
    }
    this.http.editarFiesta(this.id, body).subscribe((response:any) => {
      console.log(response)
      alert("Fiesta modificada")
      this.sePuedeEditar = false
      this.ngOnInit()
    },error => {
      console.log(error);
    })
  }
  editarExtra(){
    const body = {
      nombre: this.nombre,
      telefono: this.telefono1,
      descripcion: this.descripcion
    }
    this.http.editarExtra(this.id, body).subscribe((response:any) => {
      console.log(response)
      alert("Servicio modificado")
      this.sePuedeEditar = false
      this.ngOnInit()
    },error => {
      console.log(error);
    })
  }
}
