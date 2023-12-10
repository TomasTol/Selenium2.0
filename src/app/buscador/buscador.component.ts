import { Component } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  logueado: boolean = false;
  datosExtendidos: any = {};
  datosExtendidos2: any = {}
  mostrarPopUp: boolean = false;
  mostrarPopUp2: boolean = false;
  listaFiestas: any;
  listaExtra: any;
  verTabla: boolean = true;
  verTabla2: boolean = true;
  busqueda: string = "";
  servicioAux: any = {
    telefono:"",
    nombre:"",
    descripcion:"",
    imagen:"",
  }
  fiestasAux: any = {
    telefono:"",
    nombreEmpresa:"",
    ubicacion:"",
    imagen:"",
  }
  constructor(   private http: HttpClientService,
    private router: Router) { }
  ngOnInit(){
   
    if(localStorage.getItem("token")){
      this.logueado = true
    }
    else{
      this.logueado = false
    }
   
   
    this.http.getFiestas().subscribe({
      next: (data: any) => {
        console.log(data);
        this.listaFiestas = JSON.parse(JSON.stringify(data))
        this.verTabla = true;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
 
    this.http.getExtra().subscribe({
      next: (data: any) => {
        console.log(data);
        this.listaExtra = JSON.parse(JSON.stringify(data))
        this.verTabla2 = true;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  cambiarFiesta(){
    this.verTabla = false;
    this.verTabla2 = false;
    }
    cambiarExtra(){
      this.verTabla = true;
      this.verTabla2 = true;
    }
    vermas(idAux:string){
      this.listaExtra.forEach((Servivio:any) => {
        if(Servivio._id == idAux){
          this.servicioAux.nombre=Servivio.nombre
          this.servicioAux.telefono=Servivio.telefono
          this.servicioAux.descripcion=Servivio.descripcion
          this.servicioAux.imagen=Servivio.imagen
        }
      });
    }
    more(idAux:string){
      this.listaFiestas.forEach((fiesta:any) => {
        if(fiesta._id == idAux){
          this.fiestasAux.nombre=fiesta.nombre
          this.fiestasAux.telefono=fiesta.telefono
          this.fiestasAux.descripcion=fiesta.descripcion
          this.fiestasAux.imagen=fiesta.imagen
        }
      });
      
      const modalData = {
        nombre: this.fiestasAux.nombre,
        telefono: this.fiestasAux.telefono,
        descripcion: this.fiestasAux.descripcion,
        imagen: this.fiestasAux.imagen,
      };
      this.router.navigate(['/modal', modalData]);
    }
    
 
  buscar(){
    if(this.busqueda == ""){
      this.http.getFiestas().subscribe({
        next: (data: any) => {
          console.log(data);
          this.listaFiestas = JSON.parse(JSON.stringify(data))
          return;
        },
        error: (error: any) => {
          console.log(error);
          return;
        }
      })
      this.http.getExtra().subscribe({
        next: (data: any) => {
          console.log(data);
          this.listaExtra = JSON.parse(JSON.stringify(data))
          return;
        },
        error: (error: any) => {
          console.log(error);
          return;
        }
      })
    }
    this.http.buscarFiesta(this.busqueda).subscribe({
      next: (data: any) => {
        console.log(data);
        this.listaFiestas = JSON.parse(JSON.stringify(data))
      },
      error: (error: any) => {
        console.log(error);
      }
    })
    this.http.buscarExtra(this.busqueda).subscribe({
      next: (data: any) => {
        console.log(data);
        this.listaExtra = JSON.parse(JSON.stringify(data))
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  cerrarPopUp(){
    this.mostrarPopUp = false
  }

  abrirPopUp(nombre:any, telefono: any, descripcion: any, foto: any){
    this.datosExtendidos.nombre = nombre
    this.datosExtendidos.telefono = telefono
    this.datosExtendidos.descripcion = descripcion
    this.datosExtendidos.foto =  foto
    this.mostrarPopUp = true;
  }

  cerrarPopUp2(){
    this.mostrarPopUp2 = false
  }

  abrirPopUp2(ubicacion:any, telefono: any, empresa: any, foto: any){
    this.datosExtendidos2.ubicacion = ubicacion
    this.datosExtendidos2.telefono = telefono
    this.datosExtendidos2.empresa = empresa
    this.datosExtendidos2.foto =  foto
    this.mostrarPopUp2 = true;
  }

}