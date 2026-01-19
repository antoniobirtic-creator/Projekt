
// Funkcija za prikaz korisnika. //
const Profil = () => {

    const Korisnik = {
        // JS objekt se sastoji od "key" : "value" parova //
        "ime": "Marko",
        "prezime": "Marković",
        "godine": 28,
        "vozackaDozvola": true,
        "vjestine": ["JavaScript", "React", "Node.js"],
        "adresa": {
            "ulica": "Vukovarska 10",
            "pbroj": 10000,
            "grad": "Zagreb"
        }
    }



    // Ova komponenta vraća info o korisniku.//
    return (
        <div className="container">
            <h1>Profil stranica</h1>
        </div>
    )

};

export default Profil;