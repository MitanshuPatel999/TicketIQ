import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  id:string|null="";
  apiUrl:string="http://localhost:3333/users";
  
  registerUser(inputData: any):any{
    return this.http.post<any>(this.apiUrl,inputData);
  }

  getUser(username: any){
    return this.http.get<any>(this.apiUrl,{params: {"username":username}});
  }

  getAllUsers(){
    return this.http.get<any>(this.apiUrl);
  }

  updateUser(id: any, inputData:any){
    return this.http.put<any>(this.apiUrl, inputData);
  }

  createTicket(inputData: any){
    this.http.post<any>("",inputData);
  }

  getTicket(id: any){
    return this.http.get<any>(this.apiUrl,id);
  }

  getAllTickets(id: any){
    return this.http.get<any>(this.apiUrl,id);
  }

  updateTicket(id: any, inputData:any){
    return this.http.put<any>(this.apiUrl, inputData);
  }

  isLoggedIn():boolean{
    return sessionStorage.getItem('id')!=null;
  }

  getRole() {
    this.id=sessionStorage.getItem('id')
    return this.http.get<any>(this.apiUrl);
  }
}
