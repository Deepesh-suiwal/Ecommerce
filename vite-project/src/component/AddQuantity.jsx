import React, { useContext, useEffect, useState } from "react";
import Product from "./Product";
import { cartContext } from "../Home";
import { MdRemoveShoppingCart } from "react-icons/md";

function AddQuantity({ Product }) {
  const {
    cartBuy,
    setCartBuy,
    localQuantity,
    setLocalQuantity,
    increaseNumber,
    decreaseNumber,
    deleteCart,
  } = useContext(cartContext);

  useEffect(() => {
    setLocalQuantity(
      cartBuy.find((existingProduct) => existingProduct.id === Product.id)
        .quantity
    );
  }, [Product, cartBuy]);

  return (
    <>
      <div className="miniCart flex items-center justify-center">
        <div className="cartQty flex items-center justify-center px-6">
          <button
            className="increaseQty px-1 bg-amber-400 cursor-pointer"
            onClick={() => {
              setLocalQuantity((prev) => prev + 1);
              increaseNumber(Product);
            }}
          >
            +
          </button>
          <p className="bg-gray-300 px-2">{localQuantity}</p>
          <button
            className="increaseQty px-1 bg-amber-400 cursor-pointer"
            onClick={() => {
              setLocalQuantity((prev) => prev - 1);
              decreaseNumber(Product);
            }}
          >
            -
          </button>
        </div>
        <MdRemoveShoppingCart
          className="removeCart"
          onClick={() => {
            deleteCart(Product);
          }}
        />
      </div>
    </>
  );
}

export default AddQuantity;
