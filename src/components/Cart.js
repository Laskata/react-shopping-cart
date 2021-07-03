import React from "react";
import formatCurrency from "../util";

const Cart = ({ shoppingCart, removeFromCart }) => {
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
        </div>
        {shoppingCart.length !== 0 && (
          <div className="cart">
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  shoppingCart.reduce(
                    (acc, currValue) => acc + currValue.price * currValue.count,
                    0
                  )
                )}
              </div>
              <button className="button primary">Proceed</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
