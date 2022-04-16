import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';


const homeRoute:Route = {
  path: '',
  component: HomeComponent
}
const aboutRoute: Route = {
  path: "about",
  component: AboutComponent
}

const routes: Routes = [homeRoute, aboutRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
