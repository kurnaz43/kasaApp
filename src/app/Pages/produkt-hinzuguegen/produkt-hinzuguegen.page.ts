import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProduktAdderService } from 'src/app/services/produkt-adder.service';
import { Artikel } from 'src/POJO/Artikel';
@Component({
  selector: 'app-produkt-hinzuguegen',
  templateUrl: './produkt-hinzuguegen.page.html',
  styleUrls: ['./produkt-hinzuguegen.page.scss'],
})
export class ProduktHinzuguegenPage implements OnInit {
  private prodName: string;
  private bestand: number;
  private vk: number;
  private ek: number;
  private icon: string;
  constructor(private produktAdder: ProduktAdderService, private toastController: ToastController) { }

  ngOnInit() {
  } 
  async abort() {
    const toast = await this.toastController.create({
      message: 'Iptal edildi!',
      duration: 3000,
      position: 'top',
      buttons: [
        {
          text: 'Kapat!',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }
  async addProd() {
    this.produktAdder.produktHinzufügen(this.prodName, new Artikel(
      this.prodName,
      this.bestand,
      this.vk,
      this.ek,
      this.icon));
    console.log(this.vk);
    console.log(this.ek);
    console.log(this.prodName);
    console.log(this.bestand);
    console.log(this.icon);

    const toast = await this.toastController.create({
      message: this.prodName + ' Kayitlandi!',
      duration: 3000,
      position: 'top',
      buttons: [
        {
          text: 'Kapat!',
          role: 'cancel'
        }
      ],
    });

    await toast.present();

  }
}
