import { Injectable } from '@angular/core';
import { Kunde } from 'src/POJO/Kunde';
import { WarenkorbService } from './warenkorb.service';
import { Artikel } from 'src/POJO/Artikel';
import { KundenService } from './kunden.service';

@Injectable({
  providedIn: 'root'
})
export class SchuldenService {
  private kunden: Array<Kunde> = new Array<Kunde>()
  constructor(private warenkorbService: WarenkorbService, private kundenService: KundenService) {
    kundenService.whatchKunden().subscribe((kunden: Array<Kunde>) => {
      this.kunden = kunden;
    })
  }
  public belasteKunde(kunde: Kunde, warenkorb: Map<Artikel, number>) {
   // if (!this.kundenService.hasKunde(kunde)) return
    this.kunden.forEach(vonKunden => {
      // console.log("1",vonKunden.getVorName());
      // console.log("2",kunde.getVorName());
      
      if (vonKunden == kunde) {
        // console.log("bingo");
        this.kundenService.addToOffeneRechnungen(vonKunden, warenkorb);
      }
    });

  }
}
