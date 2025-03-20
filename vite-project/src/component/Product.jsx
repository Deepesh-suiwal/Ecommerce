import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../Home";

function Product({ product }) {
  const { cartBuy, setCartBuy } = useContext(cartContext);
  const navigate = useNavigate();

  function handleAddToCart(product) {
    const productExists = cartBuy.some((item) => item.id === product.id);

    if (productExists) {
      alert("This product is already in the cart!");
    } else {
      setCartBuy([...cartBuy, product]);
    }
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
          <p> ${product.price}</p>

          <button
            className="button bg-yellow-400 text-black p-1.5"
            onClick={() => handleAddToCart(product)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
