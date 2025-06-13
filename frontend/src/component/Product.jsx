import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartProvider";

function Product({ product }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { cartId, setCartId, wishListId, setWishListId, showMessage } =
    useCart();

  const [isUpdating, setIsUpdating] = useState(false);

  function shortText(text, max = 100) {
    return text.length > max ? text.slice(0, max) + "..." : text;
  }

  function handleProductClick() {
    navigate(`/product/${product.id}`, { state: { product } });
  }

  async function handleAddToCart(productId) {}

  async function handleWishList(productId) {}

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
