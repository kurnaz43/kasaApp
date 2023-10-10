import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarenkorbPageRoutingModule } from './warenkorb-routing.module';

import { WarenkorbPage } from './warenkorb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WarenkorbPageRoutingModule
  ],
  declarations: [WarenkorbPage]
})
export class WarenkorbPageModule {}
