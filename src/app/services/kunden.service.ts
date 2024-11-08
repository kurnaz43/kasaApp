import { Injectable } from '@angular/core';
import { Kunde } from 'src/POJO/Kunde';
import { WarenkorbService } from './warenkorb.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artikel } from 'src/POJO/Artikel';

@Injectable({
  providedIn: 'root'
})
export class KundenService {
  public kunden$: BehaviorSubject<Array<Kunde>> = new BehaviorSubject<Array<Kunde>>(new Array<Kunde>);
  private currentKundeForConfiguration: Kunde = new Kunde("TestKunde", "TestKunde", new Map<Artikel, number>, new Map<Artikel, number>)
  public currentKundeForConfiguration$: BehaviorSubject<Kunde> = new BehaviorSubject<Kunde>(this.currentKundeForConfiguration);
  private kunden: Array<Kunde> = new Array<Kunde>()
  constructor(private warenkorbService: WarenkorbService) {
    let kunde1: Kunde = new Kunde("vorName1", "nachName1", new Map<Artikel, number>, new Map<Artikel, number>)
    let kunde2: Kunde = new Kunde("vorName2", "nachName2", new Map<Artikel, number>, new Map<Artikel, number>)
    let kunde3: Kunde = new Kunde("vorName3", "nachName3", new Map<Artikel, number>, new Map<Artikel, number>)
    this.setKunden(kunde1);
    this.setKunden(kunde2);
    this.setKunden(kunde3);
  }

  public whatchKunden(): Observable<Array<Kunde>> {
    return this.kunden$.pipe();
  }
  getKundenDeprecated(): Array<Kunde> {
    return this.kunden;
  }
  setKunden(kunde: Kunde) {
    this.kunden.push(kunde);
    this.kunden$.next(this.kunden);
  }
  hasKunde(kunde: Kunde): boolean {
    this.kunden.forEach(vonKunden => {
      if (vonKunden === kunde) return true
    })
    return false
  }
  setOffeneRechnungen(kunde: Kunde, warenkorb: Map<Artikel, number>) {
    kunde.setoffeneRechnungen(warenkorb);
  }
  addToOffeneRechnungen(kunde: Kunde, warenkorb: Map<Artikel, number>) {
    warenkorb.forEach((anzahl: number, artikel: Artikel) => {
      kunde.addToOffeneRechnungen(artikel, anzahl);
    });
  }

  setKundeForConfiguration(kunde: Kunde) {
    this.currentKundeForConfiguration = kunde;
    this.currentKundeForConfiguration$.next(this.currentKundeForConfiguration);
  }
  public whatchKundeForConfiguration(): Observable<Kunde> {
    return this.currentKundeForConfiguration$.pipe();
  }
  begleichtAlleRechnungen(kunde: Kunde): void {
    kunde.begleichtAlleRechnungen();
  }
}
