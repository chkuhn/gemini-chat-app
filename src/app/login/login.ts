import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username) {
      this.router.navigate(['/chat', this.username]);
    }
  }
}