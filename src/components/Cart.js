import React, { useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";

const Cart = (props, { closeModal }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const [checkoutInfo, setCheckoutInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const { name, email, address } = checkoutInfo;

  const handleInput = (event, name) => {
    setCheckoutInfo({
      ...checkoutInfo,
      [name]: event.target.value,
    });
  };

  const onCreateOrder = (e) => {
    e.preventDefault();
    const order = {
      name: name,
      email: email,
      address: address,
      cartItems: props.cartItems,
      total: props.cartItems.reduce(
        (acc, currItem) => acc + currItem.price * currItem.count,
        0
      ),
    };
    props.createOrder(order);
  };

  const onCloseModal = () => {
    props.clearOrder();
  };

  return (
    <div>
      {props.order && (
        <Modal isOpen={true} onRequestClose={onCloseModal} ariaHideApp={false}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className="order-details">
              <h3 className="success-message">Your order has been placed.</h3>
              <h2>Order {props.order._id}</h2>
              <ul>
                <li>
                  <div>Name:</div>
                  <div>{props.order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{props.order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{props.order.address}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>${props.order.total}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>
                    {props.order.cartItems.map((item) => (
                      <div>
                        {item.count} {" x "} {item.title}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </Zoom>
        </Modal>
      )}
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
                <form onSubmit={onCreateOrder}>
                  <ul className="form-container">
                    <li>
                      <label>Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        onChange={(e) => handleInput(e, "email")}
                      />
                    </li>
                    <li>
                      <label>Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        onChange={(e) => handleInput(e, "name")}
                      />
                    </li>
                    <li>
                      <label>Address</label>
                      <input
                        name="address"
                        type="text"
                        required
                        onChange={(e) => handleInput(e, "address")}
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
    order: state.order.order,
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps, {
  removeFromCart,
  createOrder,
  clearOrder,
})(Cart);
