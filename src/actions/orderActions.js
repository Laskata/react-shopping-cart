import { CLEAR_ORDER, CREATE_ORDER, CLEAR_CART } from "../types";

export const createOrder = (order) => (dispatch) => {
  fetch("/api/orders", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: CREATE_ORDER,
        payload: data,
      });
      localStorage.clear("cartItems");
      dispatch({ type: CLEAR_CART });
    });
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
