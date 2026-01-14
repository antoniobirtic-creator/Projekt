import './App.css';
import Users from './components/Users'; // Uvoz komponente

function App() {
  return (
    <div className="App">
      {/* Ovdje se sada prikazuje tvoj CRM popis korisnika */}
      <Users />
    </div>
  );
}

export default App;