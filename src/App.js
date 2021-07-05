import React, { useState } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

const App = () => {
  const [shoppingCart, setShoppingCart] = useState(
    localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : []
  );

  const addToCart = (product) => {
    const shoppingCartItems = shoppingCart.slice();
    let alreadyInCart = false;
    shoppingCartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      shoppingCartItems.push({ ...product, count: 1 });
    }
    setShoppingCart(shoppingCartItems);
    localStorage.setItem("cartItem", JSON.stringify(shoppingCartItems));
  };

  const removeFromCart = (product) => {
    const shoppingCartItems = shoppingCart.slice();
    const newItems = shoppingCartItems.filter(
      (item) => item._id !== product._id
    );
    setShoppingCart(newItems);
    localStorage.setItem("cartItem", JSON.stringify(newItems));
  };

  const createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products addToCart={addToCart} />
          </div>
          <div className="sidebar">Cart Items</div>
          <Cart
            shoppingCart={shoppingCart}
            removeFromCart={removeFromCart}
            onCreateOrder={createOrder}
          />
        </div>
      </main>
      <footer>All rights is reserved.</footer>
    </div>
  );
};

export default App;
