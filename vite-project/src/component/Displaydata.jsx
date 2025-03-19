import React from "react";
import { useLocation} from "react-router-dom"; 

function Displaydata() {
  const location = useLocation(); 
  const { product } = location.state; 

  return (
    <div className="product-details">
      <div className="product-photo2 h-100 w-60">
        <img src={product.image} alt="Product Image" />
      </div>
      <div className="details text-center">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>

        <button className="button bg-red-400 text-white p-1.5">
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Displaydata;
