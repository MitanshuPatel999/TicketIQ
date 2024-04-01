import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  id:string|null="";
  apiUrl:string="";
  
  registerUser(inputData: any):any{
    this.http.post<any>("",inputData);
  }

  getUser(id: any){
    return this.http.get<any>(this.apiUrl,id);
  }

  getAllUsers(id: any){
    return this.http.get<any>(this.apiUrl,id);
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
