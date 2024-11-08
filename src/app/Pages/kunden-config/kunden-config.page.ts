import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kunde } from 'src/POJO/Kunde';
import { KundenService } from 'src/app/services/kunden.service';

import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';
@Component({
  selector: 'app-kunden-config',
  templateUrl: './kunden-config.page.html',
  styleUrls: ['./kunden-config.page.scss'],
})
export class KundenConfigPage implements OnInit {
  kunde: Kunde = undefined;

  usbPrintDriver: UsbDriver;
  webPrintDriver: WebPrintDriver;

  status: boolean = false;
  constructor(private kundenService: KundenService, private printService: PrintService) {
    this.kundenService.whatchKundeForConfiguration().subscribe((kunde: Kunde) => {
      this.kunde = kunde;
      console.log(kunde);

    })
    this.usbPrintDriver = new UsbDriver();
    this.printService.isConnected.subscribe(result => {
      this.status = result;
      if (result) {
        console.log('Connected to printer!!!');
      } else {
        console.log('Not connected to printer.');
      }
    });
  }

  ngOnInit() {
  }
  private requestUsb() {
    this.usbPrintDriver.requestUsb().subscribe(result => {
      this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
    });
  }
  print() {
    if (!this.status) {
      this.requestUsb();
    }
    let artikelToPrint: string;

    this.printService.init()
      .setJustification('center')
      .setBold(true)
      .setSize('large')
      .writeLine('VFIB Herten-Westerholt')
      .writeLine('Camii ve Talebe Yurdu')
      .feed(1)
      .setBold(false)
      .writeLine('Liste')
      .writeLine(this.kunde.getVorName() + " " + this.kunde.getNachName())
      //.writeLine('Sipariş onayı') //türkische Zeichen funktionieren nicht (noch) 
      //.writeLine('Arenbergstr. 5')
      //.writeLine('45701 Herten')
      .setBold(false)
      .setSize('normal')
      .setJustification('left')
      .writeLine('------------------------------------------------')
      .writeLine('Adet x Gida =                             Toplam')
      .writeLine('------------------------------------------------')
      .setJustification('left')
      .writeLine('')
      .writeLine(this.kunde.getOffeneRechnungen().toString())//TODO: implement function for genereting string
      .setJustification('center')
      .writeLine('------------------------------------------------')
      .writeLine(this.kunde.calcSchulden().toString() + "€")
      .writeLine('------------------------------------------------')
      .writeLine('------------------------------------------------')
      .writeLine('Afiyet Olsun!')
      .writeLine('------------------------------------------------')
      .feed(3)
      .cut('full')
      .flush();
  }
  begleichtRechnungen(){
    this.kundenService.begleichtAlleRechnungen(this.kunde)
  }

}
