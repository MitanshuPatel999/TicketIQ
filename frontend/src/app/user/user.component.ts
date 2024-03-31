import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule , Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  constructor(private builder: FormBuilder, private router: Router, private service: AuthService){
    sessionStorage.clear();
  }

  result:any;
  loginForm=this.builder.group({
    id:this.builder.control('', Validators.required),    
    password:this.builder.control('', Validators.required)
  });

  proceedLogin(){
    if(this.loginForm.valid){
      this.service.getUser(this.loginForm.value.id).subscribe(item => 
      {
        this.result = item;
        if(this.result.password===this.loginForm.value.password){
          if(this.result.isactive){
            sessionStorage.setItem('id',this.result.id);
            sessionStorage.setItem('role',this.result.role);
            this.router.navigate(['dashboard']);
          }
          else{
            alert('Please contact admin!');
          }
        }        
        else{
          alert('Invalid credentials!');
        }
      }  
      );
    }
    else{
      alert('Please enter valid data!');
    }
  }
}
