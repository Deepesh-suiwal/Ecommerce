import { createContext, useContext, useState } from "react";
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

  function showMessage(type, text) {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 1500);
  }
  async function fetchData() {
    const response = await axios.get("https://fakestoreapi.com/products");
    console.log(response.data);
    setProducts(response.data);
  }

  return (
    <CartContext.Provider
      value={{
        cartBuy,
        setCartBuy,

        localQuantity,
        setLocalQuantity,

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
