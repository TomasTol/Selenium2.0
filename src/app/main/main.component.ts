import { Component } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {

  logueado: boolean = false;

  constructor(
    private http: HttpClientService, 
    private router: Router
  ){}
  ngOnInit(){
    if(localStorage.getItem("token")){
      this.logueado = true
    }
    else{
      this.logueado = false
    }
    this.http.getFiestas().subscribe((response:any) => {
      console.log(response)
    } , error => {  
      console.log(error);
    })
  }
  terminar(){
   localStorage.removeItem("token")
   localStorage.removeItem("email")
   this.logueado = false
  }
}