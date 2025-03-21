import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../Home";
import AddQuantity from "./AddQuantity";

function Product({ product }) {
  const { cartBuy, setCartBuy, isProductInCart } = useContext(cartContext);
  const navigate = useNavigate();

  function handleAddToCart(product) {
    const productExists = cartBuy.some((item) => item.id === product.id);

    setCartBuy([...cartBuy, product]);
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
        <div className="content text-center">
          <h3>{shortTitle(product.title)}</h3>
          <p>
            <span className="font-bold">price: $</span>
            {product.price}
          </p>
          {isProductInCart(product) ? (
            <AddToCart Product={product} />
          ) : (
            <button
              className="button bg-yellow-400 text-black p-1.5 font-bold"
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
