import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  private visible:boolean = false

  constructor() { }

  public getVisible() {
    return this.visible
  }

  public toggle(){
    this.visible = !this.visible
  }
}
