import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRespond, IUser, IName } from '../interfaces';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

user: any;

  constructor(private http: HttpClient) { }

  

  getUsers(){

    return this.http.get<IUserRespond[]>(environment.URL_BASE+environment.URL_ENDPOINT);
   
}
  //aux
  aux(user: IUserRespond){

    this.user = user;
    this.user.name = user.name.firstName + " " + user.name.lastName
    return this.user

  }

  // postUser(forma: any){
    
  //   return this.http.post(environment.URL_BASE+environment.URL_ENDPOINT, <IUserRespond>);
  // }
  

}
