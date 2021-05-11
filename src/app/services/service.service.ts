import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { IUserRespond } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http: HttpClient) { }

  getAllUser(){
    const base = environment.URL_BASE + environment.URL_ENDPOINT
    return this.http.get(base)
  }

  postUser(user:IUserRespond){
    const base = environment.URL_BASE + environment.URL_ENDPOINT
    return this.http.post(base, user)
  }

  putUser(user:IUserRespond){
    const base = environment.URL_BASE + environment.URL_ENDPOINT + '/' + user.id
    return this.http.put(base, user)
  }
}
