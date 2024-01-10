import { combineReducers } from "redux";
import { CategoryReducer } from "./Admin/Category/CategoryReducer";
import { ProductReducer } from "./Admin/Product/ProductReducer";
import { CartReducer } from "./CartReducer";
import { Reducer } from "./Reducer";
export const rootReducer = combineReducers({
  Auth: Reducer,
  Categories: CategoryReducer,
  Products: ProductReducer,
  Cart: CartReducer,
});
