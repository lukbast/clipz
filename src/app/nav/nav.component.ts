import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  constructor(
    public modal: ModalService, 
    public auth: AuthService, 
    public afAuth: AngularFireAuth,
    public router: Router) {

  }

  ngOnInit(): void {
  }

  public openModal($event: Event){
    $event.preventDefault()

    this.modal.toggleModal("auth")
  }

  public logout ($event : Event):void {
    $event.preventDefault()
    this.auth.logout()
  }

}