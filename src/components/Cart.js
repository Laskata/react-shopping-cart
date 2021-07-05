import React, { useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";

const Cart = (
  props,
  { shoppingCart, onCreateOrder, removeFromCart, cartItems }
) => {
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

  console.log(typeof props.cartItems);
  console.log(props.cartItems);

  return (
    <div>
      <div className="cart">
        <Fade left cascade>
          <ul className="cart-items">
            {props.cartItems.map((item) => (
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
                      onClick={() => props.removeFromCart(item)}
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
      {props.cartItems.length !== 0 && (
        <div>
          <div className="cart">
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  props.cartItems.reduce(
                    (acc, currValue) => acc + currValue.price * currValue.count,
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
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps, { removeFromCart })(Cart);
