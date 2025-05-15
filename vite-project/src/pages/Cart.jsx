import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartProvider";

function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cartId, setCartId, showMessage } = useCart();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchCartItems = async () => {
      setLoading(true);

      try {
        let currentCart = cartId;

        if (currentCart.length === 0) {
          const db = getFirestore();
          const cartRef = doc(db, "cart", user.uid);
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists()) {
            currentCart = cartSnap.data().items || [];
            setCartId(currentCart);
          }
        }

        if (currentCart.length > 0) {
          const items = await Promise.all(
            currentCart.map(async (item) => {
              const res = await fetch(
                `https://fakestoreapi.com/products/${item.productId}`
              );
              const data = await res.json();
              return { ...data, quantity: item.quantity };
            })
          );

          setProducts(items);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        showMessage("error", "Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user,cartId]); 

  const updateCart = async (updatedCart) => {
    const db = getFirestore();
    const cartRef = doc(db, "cart", user.uid);

    try {
      await setDoc(cartRef, { items: updatedCart }, { merge: true });
      setCartId(updatedCart);
    } catch (err) {
      console.error("Failed to update cart:", err);
      showMessage("error", "Could not update cart.");
    }
  };

  const handleQuantityChange = (id, delta) => {
    const updated = cartId.map((item) =>
      item.productId === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    showMessage(
      delta > 0 ? "success" : "error",
      delta > 0 ? "Quantity increased" : "Quantity decreased"
    );
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartId.filter((item) => item.productId !== id);
    showMessage("error", "Item removed from cart.");
    updateCart(updated);
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    updateCart([]);
    setProducts([]);
    showMessage("success", "Cart cleared!");
  };

  const total = products
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 justify-center">
        🛒 Your Shopping Cart
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 flex gap-4 items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-24 object-contain"
              />
              <div className="flex-1 text-left">
                <p className="text-sm text-gray-600">
                  Category: {item.category}
                </p>
                <p className="text-md font-semibold">{item.title}</p>
                <p className="text-md font-bold mt-1 text-black">
                  Price: ${item.price} × {item.quantity}
                  <span className="ml-2 text-green-600 font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => handleQuantityChange(item.id, -1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </button>
                <button
                  className="text-red-600 ml-2"
                  onClick={() => removeItem(item.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <hr className="my-6" />
          <h2 className="text-2xl font-bold">Total: ${total}</h2>

          <div className="flex gap-4 mt-4 justify-center">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
