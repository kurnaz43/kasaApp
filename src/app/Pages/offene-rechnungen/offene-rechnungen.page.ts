import { Component, OnInit } from '@angular/core';
import { Kunde } from 'src/POJO/Kunde';
import { KundenService } from 'src/app/services/kunden.service';
import { SchuldenService } from 'src/app/services/schulden.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offene-rechnungen',
  templateUrl: './offene-rechnungen.page.html',
  styleUrls: ['./offene-rechnungen.page.scss'],
})
export class OffeneRechnungenPage implements OnInit {
  
  private kunden: Kunde[];
  public results
  constructor(private kundenService: KundenService) { 
    kundenService.whatchKunden().subscribe((kunden: Array<Kunde>)=>{
      this.kunden = kunden;
      console.log("#### offene-rechnungen: ",kunden);
      this.results = [...kunden];
    });
  }
  ngOnInit() {
  }
  private setKundeForConfiguration(kunde: Kunde) {
    this.kundenService.setKundeForConfiguration(kunde);
  }
  loadData(){
    this.results = [...this.kunden];
    console.log(this.kunden);
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.kunden.filter((d) => d.getVorName().toLowerCase().indexOf(query) > -1);
  }


}
