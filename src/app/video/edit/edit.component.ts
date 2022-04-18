import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnChanges {

  readonly modID = 'editClip'
  @Input() activeClip: IClip | null = null
  alertMsg = "Please wait! Updating the clip."
  showAlert = false
  alertColor = "blue"
  submited = false
  @Output() update = new EventEmitter()

  clipID = new FormControl('')
  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  })

  constructor(
    private modal: ModalService, 
    private clipService: ClipService ) { }

  ngOnInit(): void {
    this.modal.register(this.modID)
  }

  ngOnDestroy(){
    this.modal.unregister(this.modID)
  }

  ngOnChanges(): void {
      if (!this.activeClip){
        return
      }

      this.clipID.setValue(this.activeClip.docID)
      this.title.setValue(this.activeClip.title)
  }

  async submit(){
    if (!this.activeClip){
      return
    }
    this.submited = true
    this.showAlert = true
    this.alertColor = "blue"
    this.alertMsg = "Please wait! Updating the clip."
    try{
      await this.clipService.updateClip(this.clipID.value, this.title.value)
    } catch (e) {
        this.submited = false
        this.alertColor = 'red'
        this.alertMsg = "Something went wrong. Try again later"
        return
    }

    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)
    this.submited = false
    this.alertColor = 'green'
    this.alertMsg = 'Success!'

    setTimeout(() =>{
      this.modal.toggleModal(this.modID)
      this.alertMsg = "Please wait! Updating the clip."
      this.showAlert = false
      this.alertColor = "blue"
    }, 900)
  }

}
