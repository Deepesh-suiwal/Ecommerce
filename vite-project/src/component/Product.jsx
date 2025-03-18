import { useState } from "react";
import { Link } from "react-router-dom";
function Product({ product }) {
  const [cart, setCart] = useState([]);
  function handleAddToCart(product) {
    setCart([...cart, product]);
  }
  console.log(cart);

  function shortTitle(title) {
    return title.length > 30 ? title.substring(0, 30) + "..." : title;
  }

  return (
    <div className="parent">
      <div className="product">
        <div className="product-photo h-60 w-50">
          <img
            src={product.image}
            onClick={() => handleAddToCart(product)}
            alt="productImage"
          />
        </div>
        <div className="content text-center">
          <h3>{shortTitle(product.title)}</h3>
          <p>{product.price}</p>

          <Link className="button bg-red-400 text-white p-1.5" to="">
            Add To Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
