import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthentificated = false;

  constructor() { }

  login() {
    this.isAuthentificated = true;
  }

  logout() {
    this.isAuthentificated = false;
    window.localStorage.clear()
  }

  isLoggedIn(): boolean {
    return this.isAuthentificated
  }
}
