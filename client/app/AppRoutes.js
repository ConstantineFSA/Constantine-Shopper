import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import SignUp from "../features/auth/SignUp";
import Home from "../features/home/Home";
import Products from "../features/products/Products";
import SingleProduct from "../features/singleProduct/SingleProduct";
import { fetchAllProducts } from "../features/products/productsSlice";
import Users from "../features/users/Users";
import User from "../features/user/User";
import { me } from "./store";
import { fetchUsers } from "../features/users/usersSlice";
import AddProduct from "../features/products/AddProduct";
import Cart from "../features/cart/Cart";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const userId = useSelector((state) => state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(fetchAllProducts());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User userId={userId} />} />
          <Route path="/users/:id/cart" element={<Cart userId={userId}/>} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<SignUp name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User userId={userId} />} />
          <Route path="/users/:id/cart" element={<Cart userId={userId}/>} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
