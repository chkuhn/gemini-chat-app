import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ClarityModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit {
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  username: string = '';

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.usernameInput.nativeElement.focus();
  }

  login() {
    if (this.username) {
      this.router.navigate(['/chat', this.username]);
    }
  }
}