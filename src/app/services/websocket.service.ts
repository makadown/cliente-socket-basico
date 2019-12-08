import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

/**
 * Este servicio se encarga de efectuar las conexiones con el servidor de sockets
 */
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  /**
   * Para revisar el estado del socket
   */
  public socketStatus = false;
  public usuario: Usuario;

  constructor(private socket: Socket, private router: Router) {
    this.cargarStorage();
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
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  /**
   * Método para emitir cualquier evento
   * @param evento Nombre de evento
   * @param payload Payload
   * @param callback Funcion de retorno
   */
  emit(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback);
  }

  /**
   * Método para escuchar cualquier evento que emita el servidor
   * @param evento Evento
   */
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  /**
   * Método para loguear al nuevo usuario de chat
   * @param nombre Nombre de usuario
   */
  loginWS(nombre: string) {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, respuestaDeServidor => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre'
    };
    this.emit('configurar-usuario', payload, () => {
      this.router.navigateByUrl('');
    });
  }

  /**
   * Obtengo el usuario logueado.
   * Regresa null si no existe uno.
   */
  getUsuario() {
    return this.usuario;
  }

  /**
   * Método para guardar en local storage el usuario logueado
   */
  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  /**
   * Método para cargar usuario del storage si existe
   */
  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      // Vuelvo a loguear a socket para no perder nombre de usuario
      this.loginWS(this.usuario.nombre);
    }
  }
}
