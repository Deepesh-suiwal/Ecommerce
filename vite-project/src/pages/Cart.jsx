import React, { useContext } from "react";
import { cartContext } from "../Home";

function Cart() {
  const { cartBuy, setCartBuy } = useContext(cartContext);
  function deleteCart(product) {
    const updatedCart = cartBuy.filter((item) => item.id !== product.id);
    setCartBuy(updatedCart);
  }
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
              <button
                className="bg-yellow-400 text-black p-1.5 font-bold"
                onClick={() => deleteCart(product)}
              >
                Remove from cart
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Cart;
