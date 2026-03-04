import React from "react";
import "./App.css";
import "./Gutenberg.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Naslovnica from "./pages/Naslovnica";
import Blog from "./pages/Blog";
import SinglePost from "./pages/SinglePost";
import Onama from "./pages/Onama";
import Kontakt from "./pages/Kontakt";
import Users from "./components/Users";
import Profil from "./components/zadaci/Profil";
import Korisnici from "./components/zadaci/Korisnici";
import SignIn from "./pages/SignIn";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Torte from "./pages/Torte";
import Stranica from "./pages/StranicaVjezba";
import Form from "./pages/Form";
import BlogPredavanje from "./pages/BlogPredavanje";
import AuthorPage from "./pages/AuthorPage";
import TorteSingle from "./pages/TorteSingle";
import Tecaj from "./components/Tecaj";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Profile from "./components/Profile";
import Password from "./components/Password";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Team from "./components/Team";
import MyDetails from "./components/MyDetails";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />

          <main className="flex-grow-1 container mt-4">
            <Routes>
              <Route path="/" element={<Naslovnica />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/post/:slug" element={<SinglePost />} />

              {/* Shopping Rute */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

              <Route path="/Onama" element={<Onama />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/users" element={<Users />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/stranica" element={<Stranica />} />
              <Route path="/torte" element={<Torte />} />
              <Route path="/register" element={<Register />} />

              <Route path="/admin" element={<Admin />}>
                <Route index element={<MyDetails />} />
                <Route path="mydetails" element={<MyDetails />} />
                <Route path="profile" element={<Profile />} />
                <Route path="password" element={<Password />} />
                <Route path="team" element={<Team />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/form" element={<Form />} />
              <Route path="/blog-predavanje" element={<BlogPredavanje />} />
              <Route path="/autor/:slug" element={<AuthorPage />} />
              <Route path="/torta/:slug" element={<TorteSingle />} />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/korisnici" element={<Korisnici />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/tecaj" element={<Tecaj />} />
            </Routes>
          </main>

          <ScrollToTop />
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
