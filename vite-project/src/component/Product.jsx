import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../Home";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function Product({ product }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { cartBuy, setCartBuy, isProductInCart, setCartId, setWishListId } =
    useContext(cartContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });



  useEffect(() => {
    if (!user) return;
    async function fetchCart() {
      const db = getFirestore();


      const cartRef = doc(db, "cart", user.uid);
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        const data = cartSnap.data();
        setCartId(data.items || []);
      }

      const wishlistRef = doc(db, "wishlist", user.uid);
      const wishlistSnap = await getDoc(wishlistRef);
      if (wishlistSnap.exists()) {
        setWishListId(wishlistSnap.data().items || []);
      }
    }

    fetchCart();
  }, [user,setCartId,setWishListId]);

  function showMessage(type, text) {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 1500);
  }

  async function updateFirestoreList(collection,setter,newProductID) {
    const db = getFirestore();
    const cartRef = doc(db, collection, user.uid);
    const cartSnap = await getDoc(cartRef);

    const existingItems = cartSnap.exists() ? cartSnap.data().items || [] : [];

    const updatedCart = [...new Set([...existingItems, newProductID])];

    await setDoc(cartRef, { items: updatedCart }, { merge: true });
    setter(updatedCart);
  }


  // async function updateFirestoreWishList(newProductId) {
  //   const db = getFirestore();
  //   const cartRef = doc(db, "wishlist", user.uid);
  //   const cartSnap = await getDoc(cartRef);

  //   let existingItems = [];
  //   if (cartSnap.exists()) {
  //     const data = cartSnap.data();
  //     existingItems = data.items || [];
  //   }

  //   const updatedCart = [...new Set([...existingItems, newProductId])];

  //   await setDoc(cartRef, { items: updatedCart }, { merge: true });
  //   setWishListId(updatedCart);
  // }

  async function handleAddToCart() {
    if (!user) return navigate("/login");

    // if (!existingProduct) {
    //   setCartBuy([...cartBuy, { ...product, quantity: 1 }]);
    // } else {
    //   setCartBuy(
    //     cartBuy.map((item) =>
    //       item.id === product.id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //     )     //   );
    // }

    setIsUpdating(true);
    try {
      await updateFirestoreList("cart",setCartId,product.id);
      showMessage("success", "Successfully added to cart!");
    } catch (error) {
      console.error(error);
      showMessage("error", "Error adding to cart.");
    } finally {
      setIsUpdating(false);
    }
  }

  function handleProductClick() {
    navigate(`/product/${product.id}`, { state: { product } });
  }

  function shortText(text, max = 100) {
    return text.length > max ? text.substring(0, max) + "..." : text;
  }

  async function handleWishList() {
    if (!user) return navigate("/login");

    setIsUpdating(true);
    try {
      await updateFirestoreList("wishlist",setWishListId,product.id);
      showMessage("success", "Successfully added to WishList!");
    } catch (error) {
      console.error(error);
      showMessage("error", "Error adding to WishList.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="parent">
      {message.text && (
        <div
          className={`mb-4 p-2 text-center rounded ${
            message.type === "error"
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

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
          <p className="text-[13px]">{shortText(product.description)}</p>
          <p className="pt-2 pb-2 text-blue-500 font-bold text-2xl">
            ${product.price}
          </p>

          <div className="flex items-center">
            <button
              disabled={isUpdating}
              className="WishButton text-yellow-400 px-4 py-1.5 rounded-[5px] cursor-pointer disabled:opacity-50"
              onClick={handleWishList}
            >
              <span className="flex items-center space-x-1">
                <FaHeart />
                <span>Wishlist</span>
              </span>
            </button>

            <button
              disabled={isUpdating}
              className="button bg-yellow-400 text-black px-4 py-1.5 mx-3 rounded-[5px] cursor-pointer hover:bg-yellow-300 disabled:opacity-50"
              onClick={handleAddToCart}
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
