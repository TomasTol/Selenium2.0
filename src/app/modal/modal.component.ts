import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  modalData: any;
  route: any;

  constructor() { }

  ngOnInit() {
    this.modalData = this.route.snapshot.paramMap.get('modalData');
  }

  render() {
    return `
      <div class="modal-content">
        <h1 class="modal-title">${this.modalData.nombre}</h1>
        <img src="${this.modalData.imagen}" class="modal-image">
        <p class="modal-text">${this.modalData.descripcion}</p>
        <button class="modal-close">Cerrar</button>
      </div>
    `;
  }

}