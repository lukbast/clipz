import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit, OnDestroy {

  constructor(public modal: ModalService) { }

  private modalID:string = "auth"

  ngOnInit(): void {
    this.modal.register(this.modalID)
  }

  ngOnDestroy(): void {
      this.modal.unregister(this.modalID)
  }

}