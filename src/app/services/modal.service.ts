import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  private modals: Map<string, boolean> = new Map<string, boolean>()

  constructor() { }

  public register(id: string) {
    if (this.modals.get(id) !== undefined){
      throw(`ModalService: Modal with ID ${id} is registered already.`)
    } else {
      this.modals.set(id, false)
    }
  }

  public unregister(id: string) {
    if (this.modals.get(id) === undefined){
      throw(`ModalService: Modal with ID ${id} is not registered.`)
    } else {
      this.modals.delete(id)
    }
  }

  public isModalOpen(id: string) {
    const modal:boolean | undefined = this.modals.get(id)
    if (modal !== undefined){
      return modal
    } else {
      throw(`ModalService: Modal with ID ${id} is not registered.`)
    }
  }

  public toggleModal(id:string){
    const mod:boolean | undefined = this.modals.get(id)
    if (this.modals.get(id) === undefined){
      throw(`ModalService: Modal with ID ${id} is not registered.`)
    } else {
      this.modals.set(id, !mod)
    }
  }
}