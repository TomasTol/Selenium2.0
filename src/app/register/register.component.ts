import { Component } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email!: String;
  password!: String;
  telefono!: number;
  nombre!: String;
  apellido!: String;
  nombreEmpresa!: String;
  ubicacion!: String;
  codPostal!: String; 
  aux!: boolean;
  constructor(private http: HttpClientService,private router: Router){  }
  logueado: boolean = false;

  ngOnInit(){
    if(localStorage.getItem("token")){
      this.logueado = false
    }
    else{
      this.logueado = true
    }
  }
  
  terminar(){
    localStorage.removeItem("email")
   localStorage.removeItem("token")
   this.logueado = false
  }
  r1(){
    const body = {     
      nombre: this.nombre,  
      email: this.email,
      password: this.password,
      telefono: this.telefono,
      apellido: this.apellido,
      nombreEmpresa: this.nombreEmpresa,
      ubicacion: this.ubicacion,
      codPostal: this.codPostal
    }
    
    console.log(body);
    this.http.register(body).subscribe((response:any) => {
      if(body.apellido == null && body.codPostal == null && body.email == null && body.nombre == null && body.nombreEmpresa == null && body.password == null && body.telefono == null && body.ubicacion){
        alert("por favor poner todos los datos")
      }else{
        alert("se registro exitosamente")
        this.router.navigate(['/login'])
      this.aux = true
      }
    }, error => {
      console.log(error);
      alert("error al registrarse")
    })
  }


  }

