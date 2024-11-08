import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Artikel } from 'src/POJO/Artikel';
import { Kunde } from 'src/POJO/Kunde';
import { KundenService } from 'src/app/services/kunden.service';

@Component({
  selector: 'app-kunde-hinzufuegen',
  templateUrl: './kunde-hinzufuegen.page.html',
  styleUrls: ['./kunde-hinzufuegen.page.scss'],
})
export class KundeHinzufuegenPage implements OnInit {
  private vorName: string;
  private nachName: string;
  constructor(private toastController: ToastController, private kundenService: KundenService) { }

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
  async addKunde() {
    this.kundenService.setKunden(new Kunde(this.vorName, this.nachName, new Map<Artikel, number>, new Map<Artikel, number>));
    const toast = await this.toastController.create({
      message: this.vorName + this.nachName + ' Kayitlandi!',
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
