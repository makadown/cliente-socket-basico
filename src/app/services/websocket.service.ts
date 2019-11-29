import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Usuario } from "../classes/usuario";

/**
 * Este servicio se encarga de efectuar las conexiones con el servidor de sockets
 */
@Injectable({
  providedIn: "root"
})
export class WebsocketService {
  /**
   * Para revisar el estado del socket
   */
  public socketStatus = false;
  public usuario: Usuario;

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
    this.socket.on("connect", () => {
      console.log("Conectado al servidor");
      this.socketStatus = true;
    });

    this.socket.on("disconnect", () => {
      console.log("Desconectado del servidor");
      this.socketStatus = false;
    });
  }

  /**
   * Método para emitir cualquier evento
   * @param evento
   * @param payload
   * @param callback
   */
  emit(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback);
  }

  /**
   * Método para escuchar cualquier evento que emita el servidor
   * @param evento
   */
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    this.emit("configurar-usuario", { nombre }, respuestaDeServidor => {
      console.log(respuestaDeServidor);
    });
  }
}
