import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  /**
   * Para revisar el estado del socket
   */
  public socketStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  /**
   * Método para revisar el estado del socket.
   * Este se invoca en el constructor, gracias a que
   * los metodos del socket son observables, siempre
   * van a estar pendiente de lo que suceda con el 
   * connect y el disconnect
   */
  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }
}
