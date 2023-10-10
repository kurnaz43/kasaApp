import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduktHinzuguegenPage } from './produkt-hinzuguegen.page';

const routes: Routes = [
  {
    path: '',
    component: ProduktHinzuguegenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduktHinzuguegenPageRoutingModule {}
