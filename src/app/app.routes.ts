import { Routes } from '@angular/router';
import { Login } from './login/login';
import { ChatComponent } from './chat/chat';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'chat/:username', component: ChatComponent },
];