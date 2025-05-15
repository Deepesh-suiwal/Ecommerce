import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function Displaydata() {
  const { cartId, setCartId, wishListId, setWishListId, showMessage } =
    useCart();
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const location = useLocation();

  const { product } = location.state;

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
  }, [user, cartId, wishListId]);

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
    <div className="product-details p-2 flex items-center">
      <div className=" displayImage h-80 w-100 p-2">
        <img
          src={product.image}
          alt="Product Image"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="details text-left m-1 pl-5">
        <h1 className="text-[25px] font-bold py-1">{product.title}</h1>
        <p className="pt-2 pb-2 text-blue-500 font-bold text-2xl pt-1">
          <span>$</span>
          {product.price}
        </p>

        <p className="pt-1 ">
          <span>Rating:</span> {product.rating.rate}
        </p>
        <p className="pt-1 ">
          <span>Category:</span> {product.category}
        </p>

        <p className="py-2 w-[85%]">{product.description}</p>

        <button
          className="WishButtonDisplayData text-white px-4 py-1.5 rounded-[5px] cursor-pointer"
          onClick={() => handleWishList(product.id)}
        >
          <span className="flex items-center space-x-1">
            <FaHeart />
            <span>Wishlist</span>
          </span>
        </button>

        <button
          className="button bg-yellow-400 text-white px-4 py-1.5 mx-3 rounded-[5px] cursor-pointer hover:bg-yellow-300"
          onClick={() => handleAddToCart(product.id)}
        >
          <span className="flex items-center space-x-1">
            <FaShoppingCart />
            <span>Add to cart</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Displaydata;
