import './App.css';
import Counter from './components/Counter'; // 1. Uvezi komponentu

function App() {
  return (
    <>
      <h1>Glavna stranica</h1>
      <Counter />  {/* 2. Pokaži komponentu */}
      <h1>sada još jedna stavka</h1>
    </>
  );
}

export default App;