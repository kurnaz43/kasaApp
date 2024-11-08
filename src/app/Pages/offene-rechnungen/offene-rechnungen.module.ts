import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffeneRechnungenPageRoutingModule } from './offene-rechnungen-routing.module';

import { OffeneRechnungenPage } from './offene-rechnungen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffeneRechnungenPageRoutingModule
  ],
  declarations: [OffeneRechnungenPage]
})
export class OffeneRechnungenPageModule {}
