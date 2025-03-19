import { useNavigate } from "react-router-dom"; 
import { useState } from "react";

function Product({ product }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); 

  function handleAddToCart(product) {
    setCart([...cart, product]);
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
            className="button bg-red-400 text-white p-1.5"
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
