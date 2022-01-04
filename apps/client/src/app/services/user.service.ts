import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http:HttpClient) { }

  currentUser:any;
  token: string = '';
  baseUrl = origin.replace(location.port,'3333');

  init(){
    this.token = sessionStorage.getItem('access_token') || '';
  }

  async auth(username:string, password:string):Promise<any>{
    this.token = (await this.http.post<any>(this.baseUrl+'/api/auth/login',{username,password}).toPromise())?.access_token;
    if (this.token){
      sessionStorage.setItem('access_token',this.token);
      await this.profile();
    }
    return this.currentUser;
  }

  async profile():Promise<any>{
    this.currentUser = await this.http.get(this.baseUrl+'/api/profile', {headers: new HttpHeaders()
        .append('Authorization', 'Bearer '+this.token)
    }).toPromise();
    return this.currentUser;
  }
}
