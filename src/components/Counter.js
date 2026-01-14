import { useState, useEffect } from 'react'; // 1. Dodajemo useEffect
import './Counter.css';

function Counter() {
  const [broj, setBroj] = useState(10);

  useEffect(() => {
    // 2. Ako broj dođe do 0, zaustavi timer i izbaci alert
    if (broj === 0) {
      alert('Bravo!');
      return; 
    }

    // 3. Postavi timer koji će se pokrenuti nakon 1 sekunde (1000ms)
    const timer = setTimeout(() => {
      setBroj(broj - 1);
    }, 1000);

    // 4. "Cleanup" funkcija - čisti timer da se ne nakupljaju u memoriji
    return () => clearTimeout(timer);

  }, [broj]); // 5. Ovaj niz [broj] kaže: "Pokreni useEffect svaki put kad se broj promijeni"

  return (
    <div className="counter-container">
      <h2>Automatsko odbrojavanje:</h2>
      <h1 style={{ fontSize: '3rem', color: '#61dafb' }}>{broj}</h1>
      
      {broj === 0 && (
        <button onClick={() => setBroj(10)} className="counter-button">
          Pokreni ponovno
        </button>
      )}
    </div>
  );
}

export default Counter;