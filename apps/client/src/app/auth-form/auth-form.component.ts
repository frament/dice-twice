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

  async auth():Promise<void>{
   await this.user.auth(this.login, this.password);
  }

  async register():Promise<void>{
    const result = await this.user.register(this.login, this.password, this.email);
    this.registerMode = false;
  }

  ngOnInit(): void {
  }

}
