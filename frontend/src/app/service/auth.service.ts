import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiUrl:string="";
  
  registerUser(inputData: any){
    this.http.post(this.apiUrl,inputData);
  }

  getUser(id: any){
    return this.http.get(this.apiUrl,id);
  }
}
