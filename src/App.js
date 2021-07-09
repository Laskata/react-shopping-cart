import React, { useState } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Login from "./components/screens/Login";
import { useSelector } from "react-redux";

const App = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <div>
            <Link to="/">React Shopping Cart</Link>
          </div>
          <div className="second-header-links">
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/login">Sign In</Link>
          </div>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Route path="/" exact component={Filter} />
              <Route path="/" exact component={Products} />
              <Route path="/login" component={Login} />
              <Route path="/cart" component={Cart} />
            </div>
            {/* <div className="sidebar">Cart Items</div> */}
          </div>
        </main>
        <footer>All rights is reserved.</footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
