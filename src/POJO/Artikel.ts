class Artikel {
    private name: String;
    private bestand: number;
    private verkaufsPreis: number;
    private einkaufPreis: number;

    public Artikel(name: String, bestand: number, verkaufsPreis: number, einkaufPreis: number) {
        this.name = name;
        this.bestand = bestand;
        this.verkaufsPreis = verkaufsPreis;
        this.einkaufPreis = einkaufPreis;
    }
}