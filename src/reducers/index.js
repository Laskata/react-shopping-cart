import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";
import { orderReducer } from "./orderReducers";
import { productsReducer } from "./productReducers";

export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});
