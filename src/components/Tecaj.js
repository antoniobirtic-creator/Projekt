import React from 'react';
import tecajniPodaci from './zadaci/data/tecaj.json';

const Tecaj = () => {

    const datumListe = tecajniPodaci[0].datum_primjene;

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Tečajna lista</h2>
            <p className="text-muted">Datum primjene: {new Date(datumListe).toLocaleDateString('hr-HR')}</p>
            
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table">
                        <tr>
                            <th>Država</th>
                            <th>Valuta</th>
                            <th className="text-start">Kupovni</th>
                            <th className="text-start">Srednji</th>
                            <th className="text-start">Prodajni</th>
                            <th className="text-start">Datum</th>

                        </tr>
                    </thead>
                    <tbody>
                        {tecajniPodaci.map((stavka, index) => (
                            <tr key={stavka.sifra_valute || index}>
                                <td>{stavka.drzava}</td>
                                <td>{stavka.valuta}</td>
                                <td className="text-start">{stavka.kupovni_tecaj}</td>
                                <td className="text-start">{stavka.srednji_tecaj}</td>
                                <td className="text-start">{stavka.prodajni_tecaj}</td>
                                <td className="text-start">{new Date(stavka.datum_primjene).toLocaleDateString('hr-HR')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tecaj;