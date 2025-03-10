import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    }
    fetchData();
  }, []);
  return (
    <>
      {products
        ? products.map((product) => {
            return (
              <div key={product.id} className="product">
                <div className="product-photo">
                  <img src={product.image} alt="productImage" />
                </div>
                <div className="content">
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                  <a href="">Add To Cart</a>
                </div>
              </div>
            );
          })
        : ""}
    </>
  );
}

export default App;
