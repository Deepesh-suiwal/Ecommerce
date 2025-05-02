import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../Home";
import AddQuantity from "./AddQuantity";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

function Product({ product }) {
  const { cartBuy, setCartBuy, isProductInCart } = useContext(cartContext);
  const navigate = useNavigate();

  function handleAddToCart(product) {
    const existingProduct = cartBuy.find((item) => item.id === product.id);

    if (!existingProduct) {
      setCartBuy([...cartBuy, { ...product, quantity: 1 }]);
    } else {
      setCartBuy(
        cartBuy.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
  }
  function shortDescription(description) {
    return description.length > 30
      ? description.substring(0, 100) + "..."
      : description;
  }

  function shortTitle(title) {
    return title.length > 30 ? title.substring(0, 30) + "..." : title;
  }

  function handleProductClick(product) {
    navigate(`/product/${product.id}`, { state: { product } });
  }

  return (
    <div className="parent">
      <div className="product">
        <div className="product-photo h-60 w-50">
          <img
            src={product.image}
            alt="productImage"
            onClick={() => handleProductClick(product)}
          />
        </div>
        <div className="content text-left">
          <h1 className="text-[16px] font-bold">{shortTitle(product.title)}</h1>

          <p className="text-[13px]">{shortDescription(product.description)}</p>

          <p className="pt-2 pb-2 text-blue-500 font-bold text-2xl">
            <span>$</span>
            {product.price}
          </p>

          <button
            className="WishButton text-yellow-400 px-4 py-1.5 rounded-[5px] cursor-pointer"
            onClick={() => handleAddToCart(product)}
          >
            <span className="flex items-center space-x-1">
              <FaHeart />
              <span>Wishlist</span>
            </span>
          </button>

          <button
            className="button bg-yellow-400 text-black px-4 py-1.5 mx-3 rounded-[5px] cursor-pointer hover:bg-yellow-300"
            onClick={() => handleAddToCart(product)}
          >
            <span className="flex items-center space-x-1">
              <FaShoppingCart />
              <span>Add to cart</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
