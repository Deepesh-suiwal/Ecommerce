import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { cartContext } from "../Home";

function Displaydata() {
  const { cartBuy, setCartBuy } = useContext(cartContext);

  const location = useLocation();

  const { product } = location.state;

  function addToCart(product) {
    const productExists = cartBuy.some((item) => item.id === product.id);

    if (productExists) {
      alert("This product is already in the cart!");
    } else {
      setCartBuy([...cartBuy, product]);
    }
  }
  console.log(cartBuy);

  return (
    <div className="product-details p-2 flex flex-col items-center">
      <div className="h-80 w-100">
        <img
          src={product.image}
          alt="Product Image"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="details text-center m-1">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p><span className="font-bold">price: $</span>{product.price}</p>

        <button
          className="button bg-yellow-400 text-black p-1.5 font-bold"
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Displaydata;
