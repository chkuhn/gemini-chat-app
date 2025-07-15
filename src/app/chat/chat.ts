import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import '@clr/icons';
import '@clr/icons/shapes/essential-shapes';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, ClarityModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  newMessage: string = '';
  username: string = '';
  users: string[] = [];
  private socket!: WebSocket;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || 'Anonymous';
    this.socket = new WebSocket('ws://localhost:8080');

    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({ type: 'login', username: this.username }));
    };

    this.socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'users':
          this.users = data.users;
          break;
        case 'chat':
          this.messages.push(data.message);
          break;
      }
    };
  }

  ngOnDestroy() {
    this.socket.close();
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.socket.send(JSON.stringify({ type: 'chat', message: this.newMessage }));
      this.newMessage = '';
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
