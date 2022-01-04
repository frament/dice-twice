import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'dice-twice-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  constructor(private user:UserService) { }

  login:string = '';
  password:string = '';

  async auth():Promise<void>{
    const result = await this.user.auth(this.login, this.password);
    console.log(result);
    const profile = await this.user.profile();
    console.log(profile);
  }

  ngOnInit(): void {
  }

}
