import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KundeHinzufuegenPageRoutingModule } from './kunde-hinzufuegen-routing.module';

import { KundeHinzufuegenPage } from './kunde-hinzufuegen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KundeHinzufuegenPageRoutingModule
  ],
  declarations: [KundeHinzufuegenPage]
})
export class KundeHinzufuegenPageModule {}
