import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffeneRechnungenPage } from './offene-rechnungen.page';

const routes: Routes = [
  {
    path: '',
    component: OffeneRechnungenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffeneRechnungenPageRoutingModule {}
