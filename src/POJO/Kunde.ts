import { Artikel } from "./Artikel";

export class Kunde {
    private vorName: string;
    private nachName: string;
    private bezahlteRechnungen: Map<Artikel, number> = new Map<Artikel, number>();
    private offeneRechnungen: Map<Artikel, number> = new Map<Artikel, number>();
    private AnzahlOffenerArtikel;

    public constructor(
        vorName: string,
        nachName: string,
        bezahlteRechnungen: Map<Artikel, number>,
        offeneRechnungen: Map<Artikel, number>) {
        this.vorName = vorName;
        this.nachName = nachName;
        this.bezahlteRechnungen = bezahlteRechnungen;
        this.offeneRechnungen = offeneRechnungen;
    }
    public getVorName(): string {
        return this.vorName;
    }
    public getNachName(): string {
        return this.nachName;
    }
    public getBezahlteRechnungen(): Map<Artikel, number> {
        return this.bezahlteRechnungen;
    }
    public getOffeneRechnungen(): Map<Artikel, number> {
        return this.offeneRechnungen;
    }
    public begleichtAlleRechnungen(): void {
        this.setoffeneRechnungen(new Map<Artikel, number>)
    }
    public setoffeneRechnungen(offeneRechnungen: Map<Artikel, number>): void {
        this.offeneRechnungen = offeneRechnungen;
    }
    public addToOffeneRechnungen(artikel, anzahl): void {
        let newCount: number = anzahl;
        let hasArtikel: Boolean = this.offeneRechnungen.has(artikel);
        console.log("hasArtikel", hasArtikel);

        if (hasArtikel) {
            newCount = this.offeneRechnungen.get(artikel)
            newCount += anzahl
        }
        console.log(artikel.getName() + " -> added to list.\nwas: " + this.offeneRechnungen.get(artikel) + "\nnew: " + newCount);

        this.offeneRechnungen.set(artikel, newCount);
    }
    public setBezahlteRechnungen(bezahlteRechnungen: Map<Artikel, number>): void {
        this.bezahlteRechnungen = bezahlteRechnungen;
    }
    public calcSchulden(): number {
        let schulden: number = 0;
        // console.log("initial schulden: ", schulden);

        this.offeneRechnungen.forEach(function (anzahl: number, artikel: Artikel) {
            // console.log("add: " + artikel.getName() + " to schulden");
            schulden += artikel.getPreis() * anzahl;
            // console.log("Current schulden: ", schulden);
        })
        // console.log("Final schulden: ", schulden);
        return schulden;
    }

    public getAnzahlOffenerArtikel(): number {
        return this.getOffeneRechnungen().size;
    }

}