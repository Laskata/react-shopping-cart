import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";
import { productsReducer } from "./productReducers";

export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
});
