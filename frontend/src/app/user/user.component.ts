import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule , Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  result:User | undefined;
  constructor(private builder: FormBuilder, private router: Router, private service: AuthService, private toastr:ToastrService){
    sessionStorage.clear();
  }

  loginForm=this.builder.group({
    username:this.builder.control('', Validators.required),    
    password:this.builder.control('', Validators.required)
  });

  proceedLogin(){
    if(this.loginForm.valid){
      this.service.getUser(this.loginForm.value.username).subscribe((item) => {
        this.result = item[0]
        if (this.result?.password === this.loginForm.value.password) {
          if (this.result?.isactive) {
            sessionStorage.setItem('id', this.result.id);
            sessionStorage.setItem('role', this.result.role);
            this.toastr.success('Login done successfully!');
            this.router.navigate(['dashboard']);
          }
          else {
            this.toastr.warning('Please contact admin!');
          }
        }
        else {
          this.toastr.warning('Invalid credentials!');
        }
      }
      );
    }
    else{
      this.toastr.warning('Please enter valid data!');
    }
  }
}
