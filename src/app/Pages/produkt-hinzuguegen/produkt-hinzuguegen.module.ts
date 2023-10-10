import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduktHinzuguegenPageRoutingModule } from './produkt-hinzuguegen-routing.module';

import { ProduktHinzuguegenPage } from './produkt-hinzuguegen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduktHinzuguegenPageRoutingModule
  ],
  declarations: [ProduktHinzuguegenPage]
})
export class ProduktHinzuguegenPageModule {}
