import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artikel } from 'src/POJO/Artikel';
import { ArchivService } from './archiv.service';
import { ProduktAdderService } from './produkt-adder.service';

@Injectable({
  providedIn: 'root'
})
export class WarenkorbService {
  private warenkorb: Map<Artikel, number> = new Map<Artikel, number>();
  private warenkorb$: BehaviorSubject<Map<Artikel, number>> = new BehaviorSubject<Map<Artikel, number>>(this.warenkorb);
  private gesamtpreis$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private gesamtpreis: number;
  private alleProdukte: Artikel[];
  private artikelToPrint: string = '';
  private wertmarkenSammlung: Map<Artikel, number> = new Map<Artikel, number>();
  constructor(private produktManager: ProduktAdderService, private archive: ArchivService) {

    produktManager.whatchAllProdukts().subscribe((alleArtikel) => {
      this.alleProdukte = Array.from(alleArtikel.values());
    });
    this.gesamtpreis$.subscribe(preis => {
      this.gesamtpreis = preis;
    })
  }
  public whatchCart(): Observable<Map<Artikel, number>> {
    return this.warenkorb$.pipe();
  }
  public whatchGesamtPreis(): Observable<number> {
    return this.gesamtpreis$.pipe();
  }
  public getWarenkorb(): Map<Artikel, number> {
    return this.warenkorb;
  }
  public setWarenkorb(warenkorb: Map<Artikel, number>): void {
    this.warenkorb = warenkorb;
  }
  public addToCart(artikel: Artikel, number: number): void {
    this.warenkorb.set(artikel, this.getArtikelAnzahl(artikel) + number);
    this.warenkorb$.next(this.warenkorb);
    this.clacGesamtPreis()
    this.artikelToPrint = this.formatKassenbon(); //erstellt einen aktuellen string zum einfügen in den kassenbon(aktueller wird überschrieben)
    this.wertmarkenSammlung.set(artikel, this.getArtikelAnzahl(artikel)); // für Wertmarken
    //  console.log('Shopping cart updated:Add: ', this.warenkorb.entries());
  }
  //export to KassenbonService
  private formatKassenbon(): string{
    let formatierterKassenbonArtikel ="";
    this.getWarenkorb().forEach(function(number, artikel){
      formatierterKassenbonArtikel += number + " x " + artikel.getName() + " = " + number * artikel.getPreis() + " Euro \n";
    })
    console.log("kassenbon: ", formatierterKassenbonArtikel);
    
    return formatierterKassenbonArtikel;
  }

  private entferneAtrikelOhneAnzahl() {
    let aktuellerWarenkorb: Map<Artikel, number> = this.getWarenkorb();
    let warenkorbModifiziert: Map<Artikel, number> = this.getWarenkorb();

    aktuellerWarenkorb.forEach(function (key, value) {
      if (key == 0) warenkorbModifiziert.delete(value);
    })
  }

  public abortFromCart(artikel: Artikel, number: number): void {
    this.warenkorb.set(artikel, this.getArtikelAnzahl(artikel) - number);
    this.warenkorb$.next(this.warenkorb);
    this.clacGesamtPreis();
    //console.log('Shopping cart updated:Delete: ', this.warenkorb.entries());
    this.entferneAtrikelOhneAnzahl();
    this.artikelToPrint = this.formatKassenbon();
  }
  public sold(): void {
    this.archive.archiveSold(this.warenkorb);
    this.warenkorb = new Map<Artikel, number>()
    this.warenkorb$.next(this.warenkorb);
    this.clacGesamtPreis();
    //  console.log('Shopping cart updated:New: ', this.warenkorb.entries());
  }
  public getArtikelToPrint(): string {
    return this.artikelToPrint;
  }

  public getWertmarkenToPrint(): Map<Artikel, number> {
    return this.wertmarkenSammlung;
  }

  public getArtikelAnzahl(artikel): number {
    let anzahl: number = this.warenkorb.get(artikel);
    if (anzahl === undefined || anzahl < 0) {
      return 0;
    }
    return this.warenkorb.get(artikel);

  }
  public clacGesamtPreis(): void {
    let gesamtpreis: number = 0;
    this.alleProdukte.forEach((artikel) => {
      if (this.warenkorb.has(artikel)) {
        gesamtpreis += this.warenkorb.get(artikel) * artikel.getPreis();
      }
    });

    this.gesamtpreis$.next(gesamtpreis);
  }
}
