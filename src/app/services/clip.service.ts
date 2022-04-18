import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private clipsCollection: AngularFirestoreCollection<IClip>;


  constructor(db: AngularFirestore) {
    this.clipsCollection = db.collection('clips')
   }

   createClip(data: IClip){
    this.clipsCollection.add(data)
   }
}
