import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Naslovnica from './pages/Naslovnica';
import Blog from './pages/Blog';
import BlogSingle from './pages/BlogSingle';
import Onama from './pages/Onama';
import Kontakt from './pages/Kontakt';
import Users from './components/Users';
import Profil from './components/zadaci/Profil';

function App() {
  return (
    <Router>
      {/* Glavni kontejner s flex postavkama za fiksni footer */}
      <div className="d-flex flex-column min-vh-100">
        
        <Navbar />

        
        <main className="flex-grow-1 container mt-4">
          <Routes>
            <Route path="/" element={<Naslovnica />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/Onama" element={<Onama />} />
            <Route path="/blog/mladen-grdovic" element={<BlogSingle />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/users" element={<Users />} />

            <Route path="/profil" element={<Profil />} />

          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;