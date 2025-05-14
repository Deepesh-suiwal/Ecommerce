import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../Home";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function Wishlist() {
  const { wishListId, setWishListId } = useContext(cartContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    async function fetchProducts() {
      try {
        const products = [];
        for (let id of wishListId) {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          const data = await res.json();
          products.push(data);
        }
        setItems(products);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    }

    if (wishListId.length > 0) {
      fetchProducts();
    } else {
      setItems([]);
    }
  }, [user, navigate, wishListId]);


  function shortText(text, max = 99) {
    return text.length > max ? text.substring(0, max) + "..." : text;
  }

  async function removeFromWishlist(id) {
    const updatedIds = wishListId.filter((itemId) => itemId !== id);

    const db = getFirestore();
    const wishlistRef = doc(db, "wishlist", user.uid);
    await setDoc(wishlistRef, { items: updatedIds }, { merge: true });

    setWishListId(updatedIds);
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="p-3 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-3 text-blue-600">
        Your Wishlist ❤️
      </h1>
      {items.length === 0 ? (
        <p className="text-center text-lg">Your wishlist is empty.!</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-6 w-[100%]">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md flex flex-col w-[24%]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-48 object-contain mb-2"
              />
              <p className="text-sm text-gray-700 p-1">
                {shortText(product.description)}
              </p>
              <p className="text-sm p-1 ">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
              <p className="text-yellow-600 text-sm p-1 ">
                ⭐ {product.rating?.rate} / 5 ({product.rating?.count} reviews)
              </p>
              <p className="text-lg font-bold text-blue-700 p-1">
                ${product.price}
              </p>
              <div className="flex justify-around p-4">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 cursor-pointer">
                  🛒 Add to Cart
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 cursor-pointer"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
