import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';

const manageRoute: Route = {
  path: "manage",
  component: ManageComponent
}

const routes: Routes = [manageRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
