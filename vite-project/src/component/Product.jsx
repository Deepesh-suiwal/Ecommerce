import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartProvider";

function Product({ product }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { cartId, setCartId, wishListId, setWishListId, showMessage } =
    useCart();

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function fetchUserData() {
      const db = getFirestore();

      const cartSnap = await getDoc(doc(db, "cart", user.uid));
      if (cartSnap.exists()) setCartId(cartSnap.data().items || []);

      const wishlistSnap = await getDoc(doc(db, "wishlist", user.uid));
      if (wishlistSnap.exists()) setWishListId(wishlistSnap.data().items || []);
    }

    fetchUserData();
  }, [user]);

  function shortText(text, max = 100) {
    return text.length > max ? text.slice(0, max) + "..." : text;
  }

  function handleProductClick() {
    navigate(`/product/${product.id}`, { state: { product } });
  }

  async function handleAddToCart(productId) {
    if (!user) return navigate("/login");

    setIsUpdating(true);
    try {
      const db = getFirestore();
      const cartRef = doc(db, "cart", user.uid);
      const cartSnap = await getDoc(cartRef);
      const existingCart = cartSnap.exists() ? cartSnap.data().items || [] : [];

      let updatedCart;
      const found = existingCart.find((item) => item.productId === productId);
      if (found) {
        updatedCart = existingCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log(updatedCart);
      } else {
        updatedCart = [...existingCart, { productId, quantity: 1 }];
        console.log(updatedCart);
      }

      await setDoc(cartRef, { items: updatedCart }, { merge: true });
      setCartId(updatedCart);
      showMessage("success", "Successfully added to cart!");
    } catch (err) {
      console.error(err);
      showMessage("error", "Error adding to cart.");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleWishList(productId) {
    if (!user) return navigate("/login");

    if (wishListId.includes(productId)) {
      showMessage("success", "Item already in Wishlist!");
      return;
    }

    setIsUpdating(true);
    try {
      const updatedWishlist = wishListId.includes(productId)
        ? wishListId
        : [...wishListId, productId];

      const db = getFirestore();
      const wishlistRef = doc(db, "wishlist", user.uid);
      await setDoc(wishlistRef, { items: updatedWishlist }, { merge: true });

      setWishListId(updatedWishlist);
      showMessage("success", "Added to Wishlist!");
    } catch (err) {
      console.error(err);
      showMessage("error", "Error adding to Wishlist.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="parent">
      <div className="product">
        <div
          className="product-photo h-60 w-50 cursor-pointer"
          onClick={handleProductClick}
        >
          <img src={product.image} alt="productImage" />
        </div>

        <div className="content text-left">
          <h1 className="text-[16px] font-bold">
            {shortText(product.title, 30)}
          </h1>
          <p className="text-[13px] pt-2">{shortText(product.description)}</p>
          <p className="pt-2 pb-2 text-blue-500 font-bold text-2xl">
            ${product.price}
          </p>

          <div className="flex items-center">
            <button
              disabled={isUpdating}
              className="WishButton text-yellow-400 px-4 py-1.5 rounded-[5px] cursor-pointer disabled:opacity-50"
              onClick={() => handleWishList(product.id)}
            >
              <span className="flex items-center space-x-1">
                <FaHeart />
                <span>Wishlist</span>
              </span>
            </button>

            <button
              disabled={isUpdating}
              className="button bg-yellow-400 text-black px-4 py-1.5 mx-3 rounded-[5px] cursor-pointer hover:bg-yellow-300 disabled:opacity-50"
              onClick={() => handleAddToCart(product.id)}
            >
              <span className="flex items-center space-x-1">
                <FaShoppingCart />
                <span>Add to cart</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
