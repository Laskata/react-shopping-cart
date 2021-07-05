import React, { useState } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [shoppingCart, setShoppingCart] = useState(
    localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : []
  );

  const filterProducts = (event) => {
    if (event.target.value === "") {
      setSize(event.target.value);
      setProducts(data.products);
    } else {
      setSize(event.target.value);
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        )
      );
    }
  };

  const sortProducts = (event) => {
    const sort = event.target.value;
    setSort(sort);
    setProducts(
      products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        )
    );
  };

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
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products products={products} addToCart={addToCart} />
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
