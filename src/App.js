import React, { useEffect, useState } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Login from "./components/screens/Login";
import { connect, useSelector } from "react-redux";
import { signout } from "./actions/userActions";
import Register from "./components/screens/Register";

const App = ({ signout }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const signoutHandler = () => {
    signout();
  };

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
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.user.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/login">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Route path="/" exact component={Filter} />
              <Route path="/" exact component={Products} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
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

// const mapStateToProps = (state) => {
//   return { products: state.products.filteredItems };
// };

export default connect(null, { signout })(App);
