import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  loginUser(trainer:any){
    return this.http.post<any>("http://localhost:3000/signin",{"trainer":trainer})
  }
  loggedIn()
  {
    return !!localStorage.getItem('token')
  }
  getToken()
  {
    return localStorage.getItem('token')
  }
  checkAdmin(){
    return !!localStorage.getItem('admin');
  }
}
