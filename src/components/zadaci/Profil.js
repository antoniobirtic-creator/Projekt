import Korisnik from './data/korisnik.json';


// Funkcija za prikaz korisnika. //
const Profil = () => {

    // Ovo JSON format, tekstualni oblik, string //
    const KorisnikJSON = '{ "ime": "Marko", "prezime": "Marković", "godine": 28, "vozackaDozvola": true, "vjestine": ["JavaScript", "React", "Node.js, HTML", "CSS"], "adresa": { "ulica": "Vukovarska 10", "pbroj": 10000, "grad": "Zagreb" } }';
    //Pomoću JSON.parse pretvaramo string u objekt//
    const Korisnik = JSON.parse(KorisnikJSON);
    

    console.log(Korisnik);

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

                        // Map funkcija prolazi kroz svaki element nssvog niza vještina i vraća ih kao listu //
                        // index je drugi parametar koji nam daje redni broj elementa u nizu //
                    Korisnik.vjestine.map(
                            (vjestina, index) => (
                                <li>{index + 1} {vjestina}</li> 
                            )
                        )
                    }



                </ul>
            </div>

        </div>
    )

};

export default Profil;