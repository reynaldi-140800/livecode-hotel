import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookingComponent } from "./booking.component";


const routes: Routes = [
  {
    path: '',
    component: BookingComponent
  },
  {
    path: ':id',
    component: BookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }