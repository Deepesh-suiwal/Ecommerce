import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Header from "./component/Header";
import Displaydata from "./component/Displaydata";
export const cartContext = createContext();
function Home() {
  const [cartBuy, setCartBuy] = useState([]);

  function isProductInCart(product) {
    const productFound = cartBuy.some((cartItems) => {
       return cartItems.id == product.id;
    });
    return productFound;
  }
  return (
    <cartContext.Provider value={{ cartBuy, setCartBuy, isProductInCart }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/product/:id" element={<Displaydata />}></Route>
        </Routes>
      </BrowserRouter>
    </cartContext.Provider>
  );
}

export default Home;
