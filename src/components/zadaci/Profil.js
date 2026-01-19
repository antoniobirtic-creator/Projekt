
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

            

            <h1>Profil korsinika</h1>
            <p>Ime: {Korisnik.ime}</p>
            <p>Prezime: {Korisnik.prezime}</p>
            <p>Godine: {Korisnik.godine}</p>
            <p>Vozačka dozvola: {Korisnik.vozackaDozvola ? "Da" : "Ne"}</p>
            <p>ulica: {Korisnik.adresa.ulica}</p>
            <p>poštanski broj: {Korisnik.adresa.pbroj}</p>
            <p>grad: {Korisnik.adresa.grad}</p>

            <div>
                Vještine:
                <ul>
               


                    {


                    Korisnik.vjestine.map(
                            (vjestina) => (
                                <li>{vjestina}</li> 
                            )
                        )
                    }



                </ul>
            </div>

        </div>
    )

};

export default Profil;