import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';

const manageRoute: Route = {
  path: "manage",
  component: ManageComponent,
  data: {
    authOnly: true
  }
}
const uploadRoute: Route = {
  path: "upload",
  component: UploadComponent,
  data: {
    authOnly: true
  }
}

const routes: Routes = [manageRoute, uploadRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
