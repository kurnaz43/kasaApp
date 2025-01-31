import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KundenConfigPage } from './kunden-config.page';

const routes: Routes = [
  {
    path: '',
    component: KundenConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KundenConfigPageRoutingModule {}
