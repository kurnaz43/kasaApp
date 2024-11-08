import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KundenConfigPageRoutingModule } from './kunden-config-routing.module';

import { KundenConfigPage } from './kunden-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KundenConfigPageRoutingModule
  ],
  declarations: [KundenConfigPage]
})
export class KundenConfigPageModule {}
