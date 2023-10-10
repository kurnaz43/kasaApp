import { Injectable } from '@angular/core';
import { Artikel } from 'src/POJO/Artikel';
import { AppRoutingModule } from '../app-routing.module';
import { ExporterService } from './exporter.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivService {
  // private archivArray: Map<string, number> = new Map<string, number>();
  private archivArray: Array<[string, string, string, string]> = new Array<[string, string, string, string]>(["name", "ek", "vk", "anzahl"]);
  private archive: Map<Artikel, number> = new Map<Artikel, number>()
  constructor(private exporter: ExporterService) {
  }
  archiveSold(warenkorb: Map<Artikel, number>) {
    // console.log("archive; warenkorb: ", warenkorb.entries());
    // console.log("archive; warenkorb: ", new Date());
    warenkorb.forEach((anzahl, artikel) => {
      if (this.archive.has(artikel)) {
        this.archive.set(artikel, warenkorb.get(artikel) + anzahl)
        console.log('changed: ', artikel.getName());
      }
      else {
        this.archive.set(artikel, anzahl)
        console.log('archiviert: ', artikel.getName());
      }
    });
    this.exporter.print();
  }

  public save() {
    let archivArray = new Array<[string, string, string, string, string, string]>(["name", "ek", "vk", "anzahl", "Umsatz", "Gewinn"]);
    Array.from(this.archive.entries()).forEach(pair => {
      archivArray.push([
        pair[0].getName(), //name
        pair[0].getEk().toString(), // ek 
        pair[0].getPreis().toString(), // vk
        pair[1].toString(), // anzahl
        (pair[0].getPreis() * pair[1]).toString(), //umsatz = vk * anzahl
        ((pair[0].getPreis() * pair[1]) - (pair[1]*pair[0].getEk())).toString()]); //gewinn= umsatz - anzahl * ek
    })
    console.log('Archiviert: archive: ', this.archive.entries());
    console.log('Archiviert: archivArray: ', archivArray.entries());
    this.export(JSON.parse(JSON.stringify(archivArray)), 'archiv')

  }
  private export(data: JSON, name: string) {
    this.exporter.exportToExcel(data, name);
  }
}
