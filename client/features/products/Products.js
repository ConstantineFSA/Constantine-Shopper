import "../styles/Products.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectProducts } from "./productsSlice";
import AddProduct from "./AddProduct";
import { Link, Routes, Route, useParams } from "react-router-dom";
import { me } from "../auth/authSlice";
import { deleteProductAsync } from "../singleProduct/singleProductSlice";
import DeleteProduct from "./DeleteProduct";
import { addToCart } from "../cart/cartSlice";

const Products = () => {
  const products = useSelector(selectProducts);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(me);

  return (
    <>
      <h1>All Products:</h1>
      {isAdmin ? <Link to="/products/add">Add a Product</Link> : ""}
      <div className="productsBody">
        {products.map((product) => (
          <div key={product.id} className="productContainer">
            <img className="productImg" src={product.imgUrl}></img>
            <div className="productInfo">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <p className="margin2px">{`$${product.price}`}</p>
              <p className="margin2px italic">
                {product.description.charAt(0).toUpperCase() +
                  product.description.slice(1)}
              </p>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      userId: id,
                      productId: product.id,
                      quantity: 1,
                    })
                  )
                }
              >
                add to cart
              </button>

              {isAdmin ? (
                <DeleteProduct className="deleteButton" product={product}>
                  REMOVE PRODUCT
                </DeleteProduct>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
