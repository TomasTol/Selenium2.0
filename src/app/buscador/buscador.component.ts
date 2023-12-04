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
  listaFiestas: any;
  listaExtra: any;
  verTabla: boolean = true;
  verTabla2: boolean = true;
  busqueda: string = "";
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
}
