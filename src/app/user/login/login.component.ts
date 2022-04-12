import { Component, OnInit } from '@angular/core';
import { ICredentials } from '../types';

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

  constructor() { }

  login(): void{
    console.log(this.credentials)
  }

  ngOnInit(): void {
  }

}
