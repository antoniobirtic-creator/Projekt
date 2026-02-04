import React from "react";
import "./App.css";
import "./Gutenberg.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Naslovnica from "./pages/Naslovnica";
import Blog from "./pages/Blog";
import SinglePost from "./pages/SinglePost";
import BlogSingle from "./pages/BlogSingle";
import Onama from "./pages/Onama";
import Kontakt from "./pages/Kontakt";
import Users from "./components/Users";
import Profil from "./components/zadaci/Profil";
import Korisnici from "./components/zadaci/Korisnici";
import Torte from "./pages/Torte";
import Form from "./pages/Form";
import BlogPredavanje from "./pages/BlogPredavanje";
import TorteSingle from "./pages/TorteSingle";
import Tecaj from "./components/Tecaj";
import ScrollToTop from "./components/ScrollToTop";

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
            <Route path="/post/:slug" element={<SinglePost />} />
            <Route path="/Onama" element={<Onama />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/torte" element={<Torte />} />
            <Route path="/form" element={<Form />} />
            <Route path="/blog-predavanje" element={<BlogPredavanje />} />
            <Route path="/torta/:slug" element={<TorteSingle />} />
            <Route path="/korisnici" element={<Korisnici />} />
            <Route path="/tecaj" element={<Tecaj />} />
          </Routes>
        </main>
        <ScrollToTop />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
