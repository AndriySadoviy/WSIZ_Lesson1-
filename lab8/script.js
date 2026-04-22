// --- ZADANIE 1 ---
function pobierzDane() {
    const i = document.getElementById('imie').value;
    const n = document.getElementById('nazwisko').value;
    const w = document.getElementById('wiek').value;

    const osoba = { imie: i, nazwisko: n, wiek: Number(w) };
    
     console.log("%c\n==== ZADANIE 1 ====");
    console.log(" Obiekt użytkownika:", osoba);
    console.log(`   - Imię: ${osoba.imie}`);
    console.log(`   - Nazwisko: ${osoba.nazwisko}`);
    console.log(`   - Wiek: ${osoba.wiek}`);
    console.log(" Format JSON:", JSON.stringify(osoba));

}

// --- ZADANIE 2 ---
class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    wypisz() {
        let znak = this.imaginary >= 0 ? "+" : "-";
        console.log(`   ➤  ${this.real} ${znak} ${Math.abs(this.imaginary)}i`);
    }

    module() {
        return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    }
}

// --- ZADANIE 3 ---
function generujTablice(ile) {
    let tablica = [];
    for (let i = 0; i < ile; i++) {
        let r = Math.floor(Math.random() * 21) - 10;
        let im = Math.floor(Math.random() * 21) - 10;
        tablica.push(new ComplexNumber(r, im));
    }
    return tablica;
}

// --- ZADANIA 4-8 ---
function uruchomZadania() {
    console.clear(); 

    const liczby = generujTablice(5);

    // Zadanie 2 i 3
    console.log("%c\n==== ZADANIE 2 & 3====");
    liczby.forEach(l => l.wypisz());

    // Zadanie 4
    console.log("%c\n==== ZADANIE 4====");
    const dodatnie = liczby.filter(l => l.real > 0 && l.imaginary > 0);
    dodatnie.length > 0 ? dodatnie.forEach(l => l.wypisz()) : console.log("   (brak liczb spełniających warunek)");

    // Zadanie 5
    console.log("%c\n==== ZADANIE 5 ====");
    liczby.map(l => new ComplexNumber(l.imaginary, l.real)).forEach(l => l.wypisz());

    // Zadanie 6
    console.log("%c\n==== ZADANIE 6====");
    const suma = liczby.reduce((s, l) => s + l.module(), 0);
    console.log(`    Wynik: ${suma.toFixed(2)}`);

    // Zadanie 7
    console.log("%c\n==== ZADANIE 7====");
    const min = liczby.reduce((m, l) => l.module() < m ? l.module() : m, liczby[0].module());
    console.log(`    Min: ${min.toFixed(2)}`);

    // Zadanie 8
    console.log("%c\n==== ZADANIE 8 ==== ");
    const max = liczby.reduce((maxObj, l) => l.module() > maxObj.module() ? l : maxObj, liczby[0]);
    max.wypisz();
    console.log(`    Moduł tej liczby: ${max.module().toFixed(2)}`);


}