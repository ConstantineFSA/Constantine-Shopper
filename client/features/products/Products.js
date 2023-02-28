import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectProducts } from "./productsSlice";

const Products = () => {
  const products = useSelector(selectProducts);
  console.log(products)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts)
  }, [dispatch]);

  return (
    <div>
      <h1>All Products:</h1>
      {products.map((product) => (
        <div className="productContainer">
          <img src={product.imgUrl}></img>
          <h3>{product.name}</h3>
          <h4>{product.price}</h4>
          <h4>{product.description}</h4>
        </div>
      ))}
    </div>
  )
}

export default Products;
