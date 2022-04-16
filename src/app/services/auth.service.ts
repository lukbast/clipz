import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import IUser from '../models/user.model';
import { Observable, map, delay, filter, switchMap, of } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>
  private redirect = false

  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute ) { 
    this.usersCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(map(user => !!user))
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(800))
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of({}))
    ).subscribe(data => {
      this.redirect = data['authOnly'] ?? false
    })
  }
  
 

  public async createUser(userData: IUser){
    if(!userData.password){
      throw new Error("Password not provided!")
    }

    const userCredential = await this.auth.createUserWithEmailAndPassword(
      userData.email, userData.password
  )
  if(!userCredential.user){
    throw new Error("User can't be found.")
  }


  await this.usersCollection.doc(userCredential.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    })

  await userCredential.user.updateProfile({
    displayName: userData.name
  })
  }

  public async logout (){
    await this.auth.signOut()

    if(this.redirect){
      await this.router.navigateByUrl("/")
    }
    
  }
}
