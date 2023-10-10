import { Injectable } from '@angular/core';
import { Artikel } from 'src/POJO/Artikel';
import * as jsonData from 'src/data/speicher.json';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduktAdderService {
  produkte: Map<String, Artikel> = new  Map<String, Artikel>; // Map<String, Artikel>;
  private alleProdukte$: BehaviorSubject<Map<String, Artikel>> = new BehaviorSubject<Map<String, Artikel>>(this.produkte);
  constructor() { }
  
  produktHinzufügen(name: String, produkt: Artikel): Observable<Map<String, Artikel>> {
       this.produkte.set(name, produkt)
    this.alleProdukte$.next(this.produkte)
   // console.log('added = ', produkt.getName());
   // console.log('this.produkte = ', this.produkte);
    return this.whatchAllProdukts();
  }
  alleProdukteFromJson() {
    return jsonData;
  }

  whatchAllProdukts(): Observable<Map<String, Artikel>> {
    return this.alleProdukte$.pipe(); 
  }
  alleProdukte() {
    return Array.from(this.produkte.values());
  }

  initProdukte() {
    let produkte = this.alleProdukteFromJson();

    let produkteMap: Map<String, Artikel> = new Map<String, Artikel>();

    for (const produkt of produkte.produkte) {
      //console.log(produkt.name);
      let artikel = new Artikel(produkt.name, produkt.bestand, produkt.verkaufsPreis, produkt.einkaufPreis, produkt.icon)
      this.produktHinzufügen(produkt.name, artikel)
      produkteMap.set(produkt.name, artikel);
    }
    //console.log('produktmap', produkteMap);

    this.produkte = produkteMap;
    return produkteMap;
  }
}
