import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KundeHinzufuegenPage } from './kunde-hinzufuegen.page';

const routes: Routes = [
  {
    path: '',
    component: KundeHinzufuegenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KundeHinzufuegenPageRoutingModule {}
