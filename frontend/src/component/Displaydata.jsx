import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartProvider";
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

  async function handleAddToCart(productId) {}
  async function handleWishList(productId) {}

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
