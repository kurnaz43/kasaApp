import { Component, OnInit } from '@angular/core';
import { Artikel } from 'src/POJO/Artikel';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';
import { WarenkorbService } from 'src/app/services/warenkorb.service';

@Component({
  selector: 'app-warenkorb',
  templateUrl: './warenkorb.page.html',
  styleUrls: ['./warenkorb.page.scss'],
})
export class WarenkorbPage implements OnInit {
  warenkorbInhalt: Array<[Artikel, number]>;
  gesamtpreis: number;
  bekommen: number = 0;
  ruckgeld: number = 0;

  status: boolean = false;
  usbPrintDriver: UsbDriver;
  webPrintDriver: WebPrintDriver;
  ip: string = '';
  orderName: string = undefined;

  constructor(private warenkorbService: WarenkorbService, private printService: PrintService) {
    this.warenkorbService.whatchCart().subscribe((warenkorb) => {
      this.warenkorbInhalt = Array.from(warenkorb.entries());
    });
    warenkorbService.whatchGesamtPreis().subscribe(preis => {
      this.gesamtpreis = preis;
    });
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
  deleteFromCart(artikel: Artikel) {
  }
  revieveMoney(money: number) {
    //this.currentGesamt = this.gesamtpreis;
    this.bekommen += money;
    this.ruckgeld = (this.gesamtpreis - this.bekommen) * -1;
  }
  sold() {
    this.bekommen = 0;
    this.ruckgeld = 0;
    this.warenkorbService.sold();
  }
  private requestUsb() {
    this.usbPrintDriver.requestUsb().subscribe(result => {
      this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
    });
  }

  private print(driver: PrintDriver) {
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
      .writeLine('Siparis onayi')
      .writeLine(this.orderName)
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
      .writeLine(this.warenkorbService.getArtikelToPrint())
      .setJustification('center')
      .writeLine('------------------------------------------------')
      .writeLine('Afiyet Olsun!')
      .writeLine('------------------------------------------------')
      .feed(3)
      .cut('full')
      .flush();
  }

  onOrderName(ev) {
    this.orderName = ev.target!.value;
  }

  private printWertmarke(driver: PrintDriver) {
    if (!this.status) {
      this.requestUsb();
    }
    let warenkorb = this.warenkorbService.getWarenkorb();

    let warenkorbEntriesArray = Array.from(warenkorb.entries());

    for (let wertmarken = 0; wertmarken < warenkorbEntriesArray.length; wertmarken++) {
      const element = warenkorbEntriesArray[wertmarken];

      this.printService.init()
      .setJustification('center')
      .setBold(true)
      .setSize('large')
      .writeLine(this.orderName)
      .writeLine(element[0].getName())
      .writeLine(element[1].toString())
      .feed(3) // wenn es kürzer ist vermischen sich die drucke bzw der drucker schneidet zu früh ab
      .cut('full')
      .flush();
    }
    //   this.printService.init()
    //     .setJustification('center')
    //     .setBold(true)
    //     .setSize('large')
    //     .writeLine(this.orderName)
    //     .feed(3)
    //     .cut('full')
    //     .flush();
  }
}
