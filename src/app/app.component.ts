import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './services/security/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'aga-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AgentAssistantAngular';
  isLoggedIn = false;
  username: string;

  adminAccess = false;
  managerAccess = false;
  login: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.name + ' ' + user.lastname;
      this.login = user.login;

      this.adminAccess = user.roles.includes('ROLE_ADMIN');
      this.managerAccess = user.roles.includes('ROLE_MANAGER');
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
