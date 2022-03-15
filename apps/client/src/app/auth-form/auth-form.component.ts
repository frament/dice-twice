import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'dice-twice-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  constructor(public user:UserService) { }

  login:string = '';
  password:string = '';
  registerMode = false;
  email:string = '';
  defaultSvgColor = '#1D1D1B';
  activeSvgColor = '#430d0a';
  buttonSvgColor = '#1D1D1B';
  buttonOkHovered = false;
  buttonRegisterHovered = false;
  buttonRegisterColor= '#1D1D1B';
  buttonCancelColor= '#1D1D1B';

  async auth():Promise<void>{
    this.buttonOkHovered = false;
    await this.user.auth(this.login, this.password);
  }

  async register():Promise<void>{
    this.buttonOkHovered = false;
    this.registerMode = false;
    if (!this.login || !this.email || !this.password) {
      return;
    }
    await this.user.register(this.login, this.password, this.email);
    await this.user.auth(this.login, this.password);
  }

  ngOnInit(): void {
  }

}
