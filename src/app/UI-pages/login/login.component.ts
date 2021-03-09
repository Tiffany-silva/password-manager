import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../Services/auth/auth.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../Services/token-storage/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide:boolean = true;
  loginForm: FormGroup;
  errorMessage:any;
  constructor(private formBuilder: FormBuilder,private authService:AuthService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmit(values:any){
    let user={
      email:values.email,
      password:values.password
    }
    console.log(user)

    this.authService.login(user).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.router.navigate(['/home']);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )

  }
}
