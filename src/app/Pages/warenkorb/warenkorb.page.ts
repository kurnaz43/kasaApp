import { Component, OnInit } from '@angular/core';
import { Artikel } from 'src/POJO/Artikel';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';
import { WarenkorbService } from 'src/app/services/warenkorb.service';
import { KundenService } from 'src/app/services/kunden.service';
import { Kunde } from 'src/POJO/Kunde';
import { SchuldenService } from 'src/app/services/schulden.service';
import { ExporterService } from 'src/app/services/exporter.service';
import { ArchivService } from 'src/app/services/archiv.service';

@Component({
  selector: 'app-warenkorb',
  templateUrl: './warenkorb.page.html',
  styleUrls: ['./warenkorb.page.scss'],
})
export class WarenkorbPage implements OnInit {
  warenkorbInhalt: Array<[Artikel, number]>;
  gesamtpreis: number;
  kunde: Kunde;
  bekommen: number = 0;
  ruckgeld: number = 0;
  bezahlmethode: string;
  status: boolean = false;
  usbPrintDriver: UsbDriver;
  webPrintDriver: WebPrintDriver;
  orderName: string = undefined;
  kunden: Kunde[];
  constructor(private archive: ArchivService, private warenkorbService: WarenkorbService, private printService: PrintService, private kundenService: KundenService, private schuldenService: SchuldenService) {
    this.warenkorbService.whatchCart().subscribe((warenkorb) => {
      this.warenkorbInhalt = Array.from(warenkorb.entries());
    });
    warenkorbService.whatchGesamtPreis().subscribe(preis => {
      this.gesamtpreis = preis;
    });
    kundenService.whatchKunden().subscribe((kunden: Array<Kunde>) => {
      this.kunden = kunden;
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
  resetMoneyInput() {
    console.log("#####");

    this.bekommen = this.ruckgeld = 0;
  }
  recieveMoney(money: number) {
    //this.currentGesamt = this.gesamtpreis;
    this.bekommen += money;
    this.ruckgeld = (this.gesamtpreis - this.bekommen) * -1;
  }
  handleChange(ev) {
    this.kunde = ev.detail.value // TODO: check if we need this
    this.onOrderName(ev);
  }
  sold() {
    this.bekommen = 0;
    this.ruckgeld = 0;
    this.printWertmarke();
    if (this.bezahlmethode === "liste") {
      // console.log(this.kunde);
      // console.log(this.orderName);
      this.schuldenService.belasteKunde(this.kunde, this.warenkorbService.getWarenkorb());
      //  this.archive.sicherheitsSpeicher(this.kunde)
      // console.log(this.kunde);
      this.printListe()
    }
    this.warenkorbService.sold();
    this.warenkorbService.getWarenkorb()
  }
  private requestUsb() {
    this.usbPrintDriver.requestUsb().subscribe(result => {
      this.printService.setDriver(this.usbPrintDriver, 'starPRNT');
    });
  }
  private printListe() {
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
      .writeLine(this.warenkorbService.formatListeBackup(this.kunde.getOffeneRechnungen()))//TODO: implement function for genereting string
      .setJustification('center')
      .writeLine('------------------------------------------------')
      .writeLine(this.kunde.calcSchulden().toString() + " Euro")
      .writeLine('------------------------------------------------')
      .writeLine('!Stellt keine Rechnung dar!')
      .writeLine('------------------------------------------------')
      .feed(5)
      .cut('full')
      .flush();

  }
  private print() {
    if (!this.status) {
      this.requestUsb();
    }

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
    this.orderName = ev.target!.value.vorName + " " + ev.target!.value.nachName;
    console.log(this.bezahlmethode);
    console.log(this.orderName);

  }
  private onInput(ev) {
    const value = ev.target!.value;
    let bekommen = value;
    this.ruckgeld = (this.gesamtpreis - bekommen) * -1;
  }

  private printWertmarke() {
    if (!this.status) {
      this.requestUsb();
    }
    let warenkorb = this.warenkorbService.getWarenkorb();

    let warenkorbEntriesArray = Array.from(warenkorb.entries());

    for (let wertmarken = 0; wertmarken < warenkorbEntriesArray.length; wertmarken++) {
      const element = warenkorbEntriesArray[wertmarken];
this.printService.printLanguage = "a";
      this.printService.init()
        .setJustification('center')
        .setBold(true)
        .writeLine("------------------------------------------------")
        .writeLine(this.orderName)
        .writeLine("------------------------------------------------")
        .setSize('large')
        .writeLine(element[1].toString() + " x " + element[0].getName())
        .setSize('normal')
        .writeLine("------------------------------------------------")
        .feed(3) // wenn es kürzer ist vermischen sich die drucke bzw der drucker schneidet zu früh ab
        .cut('partial')
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

  public testPrint() {
    var esc = '\x1B'; //ESC byte in hex notation
    var newLine = '\x0A'; //LF byte in hex notation
    
    var cmds = esc + "@"; //Initializes the printer (ESC @)
    cmds += esc + '!' + '\x38'; //Emphasized + Double-height + Double-width mode selected (ESC ! (8 + 16 + 32)) 56 dec => 38 hex
    cmds += 'BEST DEAL STORES'; //text to print
    cmds += newLine + newLine;
    cmds += esc + '!' + '\x00'; //Character font A selected (ESC ! 0)
    cmds += 'COOKIES                   5.00'; 
    cmds += newLine;
    cmds += 'MILK 65 Fl oz             3.78';
    cmds += newLine + newLine;
    cmds += 'SUBTOTAL                  8.78';
    cmds += newLine;
    cmds += 'TAX 5%                    0.44';
    cmds += newLine;
    cmds += 'TOTAL                     9.22';
    cmds += newLine;
    cmds += 'CASH TEND                10.00';
    cmds += newLine;
    cmds += 'CASH DUE                  0.78';
    cmds += newLine + newLine;
    cmds += esc + '!' + '\x18'; //Emphasized + Double-height mode selected (ESC ! (16 + 8)) 24 dec => 18 hex
    cmds += '# ITEMS SOLD 2';
    cmds += esc + '!' + '\x00'; //Character font A selected (ESC ! 0)
    cmds += newLine + newLine;
    cmds += '11/03/13  19:53:17';
    
    this.printService.init()     
        .setSize('normal')
        .writeLine(cmds)
        .feed(4)
        .cut('full')
        .flush();
  }
}
