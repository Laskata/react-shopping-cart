import React, { useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";

const Cart = ({ shoppingCart, removeFromCart, onCreateOrder }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleInput = (event) => {
    setName({ [event.target.name]: event.target.value });
    setEmail({ [event.target.name]: event.target.value });
    setAddress({ [event.target.name]: event.target.value });
  };

  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: name,
      email: email,
      address: address,
      cartItems: shoppingCart,
    };
    onCreateOrder(order);
  };

  return (
    <div>
      {shoppingCart.length === 0 ? (
        <div className="cart cart-header">Cart is empty</div>
      ) : (
        <div className="cart cart-header">
          You have {shoppingCart.length} in the cart
        </div>
      )}
      <div>
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {shoppingCart.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {shoppingCart.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    shoppingCart.reduce(
                      (acc, currValue) =>
                        acc + currValue.price * currValue.count,
                      0
                    )
                  )}
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {showCheckout && (
              <Fade right cascade>
                <div className="cart">
                  <form onSubmit={createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={handleInput}
                        />
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={handleInput}
                        />
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="addres"
                          type="text"
                          required
                          onChange={handleInput}
                        />
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
