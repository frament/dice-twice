import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../../api/src/app/services/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http:HttpClient) { }

  currentUser: { userId:number, username: string }|undefined;
  token: string = '';
  baseUrl = origin.replace(location.port,'3333');

  async init():Promise<void>{
    this.token = sessionStorage.getItem('access_token') || '';
    await this.profile();
  }

  async auth(username:string, password:string):Promise<any>{
    this.token = (await this.http.post<any>('/api/auth/login',{username,password}).toPromise())?.access_token;
    if (this.token){
      sessionStorage.setItem('access_token',this.token);
      await this.profile();
    }
    return this.currentUser;
  }

  register(Name:string, Password:string, Email:string):Promise<any>{
    return this.http.post<any>('/api/user/register',new User({Name,Password,Email})).toPromise();
  }
  logout():void{
    sessionStorage.removeItem('access_token');
    this.token = '';
    this.currentUser = undefined;
  }

  async profile():Promise<any>{
    this.currentUser = (await this.http.get('/api/user/profile').toPromise()) as { userId:number, username: string };
    return this.currentUser;
  }
}
