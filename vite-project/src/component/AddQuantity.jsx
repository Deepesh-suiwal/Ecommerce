import React, { useContext, useState } from "react";
import Product from "./Product";
import { cartContext } from "../Home";
import { MdRemoveShoppingCart } from "react-icons/md";

function AddQuantity({ Product }) {
  const { cartBuy, setCartBuy } = useContext(cartContext);
  // const [state,setState]=useState(null)

  function increaseNumber(product) {
    // setState(state+1)
    setCartBuy([...cartBuy, product]);
  }
  function decreaseNumber(Product) {
    const indexToDelete = cartBuy.findIndex((obj) => {
      return obj.id === Product.id;
    });
    setCartBuy(
      cartBuy.filter((obj, index) => {
        return index !== indexToDelete;
      })
    );
  }
  console.log(cartBuy);
  return (
    <>
      <div className="miniCart flex items-center justify-center">
        <div className="cartQty flex items-center justify-center px-6">
          <button
            className="increaseQty border m-1"
            onClick={() => increaseNumber(Product)}
          >
            +1
          </button>
          <p>{}</p>
          <button
            className="increaseQty border"
            onClick={() => decreaseNumber(Product)}
          >
            -1
          </button>
        </div>
        <MdRemoveShoppingCart className="removeCart" />
      </div>
    </>
  );
}

export default AddQuantity;
