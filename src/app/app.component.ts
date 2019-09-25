import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'cliente-socket-basico';

  constructor( public wsService: WebsocketService) {}

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
}
