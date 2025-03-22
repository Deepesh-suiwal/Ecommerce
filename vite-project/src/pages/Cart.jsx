import React, { useContext, useState } from "react";
import { cartContext } from "../Home";
import AddQuantity from "../component/AddQuantity";

function Cart() {
  const { cartBuy } = useContext(cartContext);

  return (
    <>
      {cartBuy.map((product) => {
        return (
          <div className="parent1" key={product.id}>
            <div className="cartImage h-60 w-50 p-1 ">
              <img
                src={product.image}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <div className="detail p-2">
              <p>
                <span className="font-bold">Title</span> {product.title}
              </p>
              <p>
                <span className="font-bold">Description: </span>{" "}
                {product.description}
              </p>
              <p>
                {" "}
                <span className="font-bold">Price: $</span>
                {product.price}
              </p>
              <div className="miniCart flex items-center ">
                <div className="cartQty flex items-center px-6">
                  <AddQuantity Product={product} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Cart;
