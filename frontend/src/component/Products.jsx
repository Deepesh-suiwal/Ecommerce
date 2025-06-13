import Product from "./Product";

function Products({ products }) {
  return products.map((product) => {
    return <Product key={product.id} product={product} />;
  });
}

export default Products;
