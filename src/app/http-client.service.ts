import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  url:string = 'http://localhost:3000'
  constructor(private http: HttpClient) {}


  login(body:any){
    return this.http.post(this.url + "/signin", body)
  }

  register(body: any){
    return this.http.post(this.url + "/signup", body)
  }

  cerrarSesion(){
    if(localStorage.getItem("Auth")){
      return true;
    }else{
      return false;
    }
  }

  crearFiesta(body: any){
    return this.http.post(this.url + "/crearFiesta", body)
  }
  crearServicio(body: any){
    return this.http.post(this.url + "/crearServicio", body)
  }
  getFiestas(){
    return this.http.get(this.url + "/buscarFiestas")
  }
  FiestaPorUsuario(email: any){
    return this.http.get(this.url + "/fiestas/" + email)
  }
  ExtraPorUsuario(email: any){
    return this.http.get(this.url + "/buscarExtraPorUsuario/" + email)
  }
  getExtra(){
    return this.http.get(this.url + "/buscarExtra")
  }
  buscarFiesta(busqueda: string){
    return this.http.get(this.url + "/buscarFiesta/" + busqueda)
  }
  buscarExtra(busqueda: string){
    return this.http.get(this.url + "/buscarExtra/" + busqueda)
  }
  editarFiesta(id: any, body:any){
    console.log(id)
    console.log(body)
    return this.http.patch(this.url+"/actualizarFiesta/" + id, body)
  }
  editarExtra(id: any, body:any){
    console.log(id)
    console.log(body)
    return this.http.patch(this.url+"/actualizarExtra/" + id, body)
  }
}
