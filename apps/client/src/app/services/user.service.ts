import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../../../../api/src/app/services/user/user';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http:HttpClient, private readonly cache: CacheService) { }

  currentUser: { userId:number, username: string }|undefined;
  token: string = '';
  baseUrl = origin.replace(location.port,'3333');

  async init():Promise<void>{
    this.token = this.cache.by('kv','key', 'access_token')?.value || '';
    await this.profile();
  }

  async auth(username:string, password:string):Promise<any>{
    this.token = (await this.http.post<any>('/api/auth/login',{username,password}).toPromise())?.access_token;
    if (this.token){
      const exist = this.cache.by('kv','key', 'access_token');
      if (exist){
        exist.value = this.token;
      }else{
        this.cache.insert('kv',{key:'access_token',value:this.token});
      }
      this.cache.saveState();
      await this.profile();
    }
    return this.currentUser;
  }

  register(Name:string, Password:string, Email:string):Promise<any>{
    return this.http.post<any>('/api/user/register',new User({Name,Password,Email})).toPromise();
  }
  logout():void{
    this.cache.findAndRemove('kv',{key:'access_token'});
    this.token = '';
    this.currentUser = undefined;
  }

  async profile():Promise<any>{
    this.currentUser = (await this.http.get('/api/user/profile').toPromise()) as { userId:number, username: string };
    return this.currentUser;
  }
}
