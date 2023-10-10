import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarenkorbPage } from './warenkorb.page';

const routes: Routes = [
  {
    path: '',
    component: WarenkorbPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarenkorbPageRoutingModule {}
