import { Component, OnInit } from "@angular/core";
import { WebsocketService } from "../../services/websocket.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  nombre = "";

  constructor(public wsService: WebsocketService, private router: Router) {}

  ngOnInit() {}

  ingresar() {
    if (this.nombre && this.nombre.length > 0) {
      this.wsService.loginWS(this.nombre).then(() => {
        this.router.navigateByUrl("/mensajes");
      });
    }
  }
}
