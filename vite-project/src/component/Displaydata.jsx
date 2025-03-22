import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { cartContext } from "../Home";
import AddQuantity from "./AddQuantity";

function Displaydata() {
  const { cartBuy, setCartBuy, isProductInCart } = useContext(cartContext);

  const location = useLocation();

  const { product } = location.state;

  function handleAddToCart(product) {
    setCartBuy([...cartBuy, { ...product, quantity: 1 }]);
  }

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
        <p>
          <span className="font-bold">price: $</span>
          {product.price}
        </p>

        {isProductInCart(product) ? (
          <AddQuantity Product={product} />
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
  );
}

export default Displaydata;
