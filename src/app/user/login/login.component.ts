import { Component, OnInit } from '@angular/core';
import { IAuthError, ICredentials } from '../types'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: ICredentials = {
    email: "",
    password: ""
  }
  showAlert = false
  alertMsg = 'Please wait! We are logging you in.'
  alertColor = "blue"
  inSubmission = false
  errorCodes = [
    'auth/invalid-email',
    'auth/user-disabled',
    'auth/user-not-found',
    'auth/wrong-password'
  ]


  constructor(private auth: AngularFireAuth) { }

  async login() {
    this.alertMsg = 'Please wait! We are logging you in.'
    this.alertColor = "blue"
    this.showAlert = true
    this.inSubmission = true
    try{
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch (e) {
      const err  = e as IAuthError
      this.alertColor = "red"
      this.inSubmission = false
      if (this.errorCodes.includes(err.code)){
        this.alertMsg = "Invalid email and/or password."
      } else {
        this.alertMsg = "Unexpected error has occured. Try again later."
      }
      return
    }
    this.alertMsg = "Login successful!"
    this.alertColor = 'green'
  }

  ngOnInit(): void {
  }

}
