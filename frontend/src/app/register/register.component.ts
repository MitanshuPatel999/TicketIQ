import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private builder:FormBuilder ,private service:AuthService, private router:Router,private toastr:ToastrService){}
  registerform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required])),
    confirmpassword: this.builder.control('', Validators.compose([Validators.required], )),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(true)
    });
  proceedRegister() {
     if (this.registerform.value.password===this.registerform.value.confirmpassword) {
      if (this.registerform.valid) {
        this.service.registerUser(this.registerform.value).subscribe(() => {
          this.toastr.success('Please contact admin for enable access.','Registered Successfully')
          this.router.navigate(['user'])
        });
      } 
      else {
        this.toastr.warning('Missing field or invalid data entered!')
      }
    }
    else{
      this.toastr.error('Confirm password must be same as above Password!')

    }
  }
}