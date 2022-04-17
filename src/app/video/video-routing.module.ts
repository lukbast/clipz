import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/')

const manageRoute: Route = {
  path: "manage",
  component: ManageComponent,
  data: {
    authOnly: true,
    authGuardPipe: redirectUnauthorizedToHome
  },
  canActivate: [AngularFireAuthGuard]
}
const uploadRoute: Route = {
  path: "upload",
  component: UploadComponent,
  data: {
    authOnly: true,
    authGuardPipe: redirectUnauthorizedToHome
  },
  canActivate: [AngularFireAuthGuard]
}
const manageClipsRoute: Route = {
  path: 'manage-clips',
  redirectTo: 'manage'
}

const routes: Routes = [manageRoute, uploadRoute, manageClipsRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
