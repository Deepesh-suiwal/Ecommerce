import { useState } from "react";
import { Link } from "react-router-dom";
function Product({ product }) {
  const [cart, setCart] = useState([]);
  function handleAddToCart(product) {
    setCart([...cart,product])
  }
  console.log(cart);

  return (
    <div className="product">
      <div className="product-photo">
        <img
          src={product.image}
          onClick={() => handleAddToCart(product)}
          alt="productImage"
        />
      </div>
      <div className="content">
        <h3>{product.title}</h3>
        <p>{product.price}</p>
        <Link href="">Add To Cart</Link>
      </div>
    </div>
  );
}

export default Product;
