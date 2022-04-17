import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ClipComponent } from './clip/clip.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';


const homeRoute: Route = {
  path: '',
  component: HomeComponent
}
const aboutRoute: Route = {
  path: "about",
  component: AboutComponent
}

const clipRoute: Route = {
  path: "clip/:id",
  component: ClipComponent
}

const notFound: Route = {
  path: '**',
  component: NotFoundComponent

}

const routes: Routes = [homeRoute, aboutRoute, clipRoute, notFound];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
