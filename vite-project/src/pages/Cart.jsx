import React, { useContext } from "react";
import { cartContext } from "../Home";

function Cart() {
  const { cartBuy } = useContext(cartContext);
  return (
    <>
      {cartBuy.map((product) => {
        return (
          <div className="parent1" key={product.id}>
            <div className="cartImage h-60 w-50 ">
              <img
                src={product.image}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <div className="detail">
              <p>{product.title}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Cart;
