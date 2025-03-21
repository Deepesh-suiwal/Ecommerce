import React, { useContext } from "react";
import Product from "./Product";
import { cartContext } from "../Home";
import { MdRemoveShoppingCart } from "react-icons/md";

function AddQuantity({ Product }) {
  const { cartBuy, setCartBuy } = useContext(cartContext);

  function increaseNumber(product) {
    setCartBuy([...cartBuy, product]);
  }
  function decreaseNumber(Product){
    
  }
  console.log(cartBuy);
  return (
    <>
      <div className="buttons">
        <span onClick={() => increaseNumber(Product)}>+1</span>
        <span>{}</span>
        <span onClick={() => {decreaseNumber(Product)}}>-1</span>
        <span>
          <MdRemoveShoppingCart />
        </span>
      </div>
    </>
  );
}

export default AddQuantity;
