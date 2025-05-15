import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import axios from "axios";
import { useAuth } from "./AuthContext";
const CartContext = createContext();

function CartProvider({ children }) {
  const [cartBuy, setCartBuy] = useState([]);
   const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState([]);
  const [wishListId, setWishListId] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [localQuantity, setLocalQuantity] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    async function fetchCart() {
      const db = getFirestore();
      const cartSnap = await getDoc(doc(db, "cart", user.uid));
      if (cartSnap.exists()) setCartId(cartSnap.data().items || []);
    }
    if (!user) console.log("NO USER FOUND");
    else fetchCart();
  }, []);

  function showMessage(type, text) {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 1500);
  }
  async function fetchData() {
    const response = await axios.get("https://fakestoreapi.com/products");
    console.log(response.data);
    setProducts(response.data);
  }

  function isProductInCart(product) {
    const productFound = cartBuy.some((cartItems) => {
      return cartItems.id == product.id;
    });
    return productFound;
  }

  function increaseNumber(product) {
    setCartBuy(
      cartBuy.map((existingProduct) =>
        existingProduct.id === product.id
          ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
          : existingProduct
      )
    );
  }

  function decreaseNumber(Product) {
    setCartBuy(
      cartBuy.map((existingProduct) =>
        existingProduct.id === Product.id
          ? {
              ...existingProduct,
              quantity: Math.max(existingProduct.quantity - 1, 1),
            }
          : existingProduct
      )
    );
  }

  function deleteCart(Product) {
    setCartBuy(
      cartBuy.filter((obj) => {
        return obj.id !== Product.id;
      })
    );
  }
  return (
    <CartContext.Provider
      value={{
        cartBuy,
        setCartBuy,
        isProductInCart,
        localQuantity,
        setLocalQuantity,
        increaseNumber,
        decreaseNumber,
        deleteCart,
        cartId,
        setCartId,
        setWishListId,
        wishListId,
        message,
        setMessage,
        showMessage,
        products,
        setProducts,
        fetchData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartProvider;
