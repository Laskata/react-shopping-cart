import React, { useState } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

const App = () => {
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
        <a href="/">Sign In</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products />
          </div>
          <div className="sidebar">Cart Items</div>
          <Cart />
        </div>
      </main>
      <footer>All rights is reserved.</footer>
    </div>
  );
};

export default App;
