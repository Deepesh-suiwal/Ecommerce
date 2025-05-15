import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Products from "./component/Products";
import { useCart } from "./context/CartProvider";

function App() {
  const { products, fetchData } = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mainParent flex">
        <div className="products min-h-screen">
          <Products products={products} />
        </div>
      </div>
    </>
  );
}

export default App;
