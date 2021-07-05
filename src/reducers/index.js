import { combineReducers } from "redux";
import { productsReducer } from "./productReducers";

export default combineReducers({
  products: productsReducer,
});
