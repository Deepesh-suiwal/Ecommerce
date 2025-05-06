import axios from "axios";
import { useEffect, useState } from "react";
import Products from "./component/Products";
// import { Link } from "react-router-dom";

function  App() {
  const [products, setProducts] = useState([]);
  // const [datacategory, setDataCategory] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetching();
  // }, [products]);

  async function fetchData() {
    const response = await axios.get("https://fakestoreapi.com/products");
    console.log(response.data);

    setProducts(response.data)
  }

  // function fetching() {
  //   const temp = [];
  //   products.map((product) =>
  //     !temp.includes(product.category) ? temp.push(product.category) : ""
  //   );
  //   setDataCategory(temp);
  // }

  // function filterCatagory(data) {
  //   const filtered = products.filter((product) => {
  //     return product.category === data;
  //   });
  //   setFilteredData(filtered);
  // }

  return (
    <>
      <div className="mainParent flex">
        {/* <div className="w-[20%] border-black border-r-2 text-center p-2 font-bold text-[20px]">
          <input type="text" placeholder="Click_Here to Search item" />
          {datacategory.map((OBJ) => {
            return (
              <h1 key={OBJ} onClick={() => filterCatagory(OBJ)}>
                {OBJ}
              </h1>
            );
          })}
        </div> */}
        <div className="products">
          <Products
            products={products}
          />
        </div>
      </div>
    </>
  );
}

export default App;
