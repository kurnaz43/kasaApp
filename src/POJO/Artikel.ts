export class Artikel {
    private name: string;
    private bestand: number;
    private verkaufsPreis: number;
    private einkaufPreis: number;
    private iconName: string

    public constructor(
        name: string,
        bestand: number,
        verkaufsPreis: number,
        einkaufPreis: number,
        iconName: string) {
        this.name = name;
        this.bestand = bestand;
        this.verkaufsPreis = verkaufsPreis;
        this.einkaufPreis = einkaufPreis;
        this.iconName = iconName;
    }
    public getName(): string{
        return this.name;
    }
    public getIconName(): string{
        return this.iconName;
    }
    public getBestand(): number{
        return this.bestand;
    }
    public setBestand(bestand: number): void{
        this.bestand = bestand;
    }
    public getPreis(): number{
       return this.verkaufsPreis;
    }
    public getEk(): number{
       return this.einkaufPreis;
    }
}