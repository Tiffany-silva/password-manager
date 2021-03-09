import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../Services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  hide:boolean= true;
  hideConfirm:boolean = true;
  errorMessage:any;
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      'username': [null, [Validators.required]],
      'firstName':[null, [Validators.required]],
      'lastName': [null, [Validators.required]],
      'email': [null, [Validators.required, Validators.email]],
      'masterPassword': [null, [Validators.required,this.checkPassword]],
      'confirmMasterPassword': [null, [Validators.required]],
    }, {validator: this.repeatPasswordValidator});
  }
	checkPassword(control: any) {
		const enteredPassword = control.value;
		console.log(enteredPassword)
		const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
		let r=!(passwordCheck.test(enteredPassword) && enteredPassword) ? {requirements: true} : null;
		console.log(r)
		return r;
	}

	//confirm password validator
	repeatPasswordValidator(c: AbstractControl) {
		const password = (c.get('masterPassword')) ? c.get('masterPassword').value : null;
		console.log(password)
		const passwordConfirm = (c.get('confirmMasterPassword')) ? c.get('confirmMasterPassword').value : null;
		console.log(passwordConfirm)
		console.log(password === passwordConfirm ? null : {passwordsNotEqual: true})
		return password === passwordConfirm ? null : {passwordsNotEqual: true};
	}


	onSubmit(values:any){
    let user={
      username: values.username,
      firstName:values.firstName,
      lastName:values.lastName,
      email:values.email,
      password:values.masterPassword
    }

    this.authService.register(user).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

}
