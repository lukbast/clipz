import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import {v4 as uuid } from "uuid"
import { last, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'
import { ClipService } from 'src/app/services/clip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnDestroy {
  isDragover = false
  file : File | null = null
  nextStep = false

  submited = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! Your clip is being uploaded.'
  percentage = 0
  showPercentage = false
  user : firebase.User | null = null
  task: AngularFireUploadTask | null = null

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(private storage : AngularFireStorage,
    private auth : AngularFireAuth,
    private clips: ClipService,
    private router: Router) {
      auth.user.subscribe( (user) =>{
        this.user = user
      })
    }

  ngOnDestroy(): void {
      this.task?.cancel()
  }

  storeFile($event: Event){
    this.isDragover = false

    this.file = ($event as DragEvent).dataTransfer ? 
    ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
    ($event.target as HTMLInputElement).files?.item(0) ?? null

    if (!this.file || this.file.type !== 'video/mp4'){
      return
    }
    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.nextStep = true
  }

  async upload(){
    this.uploadForm.disable()

    this.submited = true
    this.showAlert = true
    this.showPercentage = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Your clip is being uploaded.'


    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`
    
    this.task = this.storage.upload(clipPath, this.file)
    const clipRef = this.storage.ref(clipPath)
    
    this.task.percentageChanges().subscribe( (progress) =>{
      this.percentage = progress as number / 100
    })
    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: async (url) =>{
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          filename: `${clipFileName}.mp4`,
          url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        const clipDocRef = await this.clips.createClip(clip)

        this.alertMsg = "Upload sucessful! Your clip is now ready to share with the world."
        this.alertColor = "green"
        this.showPercentage = false

        setTimeout(() =>{
          this.router.navigate([
            'clip', clipDocRef.id
          ])
          }, 1000)
      },
      error: (error) =>{
        this.uploadForm.enable()
        this.alertColor = "red"
        this.alertMsg = "Upload failed! Please try again later."
        this.submited = false
        this.showPercentage = false
        console.error(error)
      }

    })
  }

}
