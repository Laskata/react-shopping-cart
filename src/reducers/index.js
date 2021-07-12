import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";
import { orderReducer } from "./orderReducers";
import { productsReducer } from "./productReducers";
import { userRegisterReducer, userSigninReducer } from "./userReducers";

export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
});
