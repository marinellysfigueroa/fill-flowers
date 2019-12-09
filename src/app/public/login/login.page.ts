import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }
  login() {
    var formElement = <HTMLFormElement>document.getElementById('inform');
    formElement.style.display='none';
    console.log("iniciando sesión");
    this.authService.login();
  }

}
