import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { IAuthError } from '../types';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private auth :AuthService, 
    private emailTaken: EmailTaken) { }

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3) 
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ], [this.emailTaken.validate])
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  ]
  )
  confirmPassword =  new FormControl('', [
    Validators.required
    
  ])
  phoneNumber=  new FormControl('', [
    Validators.required,
    Validators.minLength(15),
    Validators.maxLength(15)
  ])
  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'
  inSubmition = false


  public registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber
  }, [RegisterValidators.match("password", "confirmPassword")])

  async register() {
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'blue'

    try {
      this.inSubmition = true
      await this.auth.createUser(this.registerForm.value)
    } catch (err){
      const e = err as IAuthError
      this.alertMsg =  'An unexpected error occured. Please try again later.'
      this.alertColor= 'red'
      this.inSubmition = false
      return 
    }
    this.alertColor= "green"
    this.alertMsg = "Success! Your account has been created"
    this.inSubmition = false
  }

}