export const initialState = {
  cartItems: [],
  error: "",
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_CART_ITEM":
      return {
        ...state,
      };
    case "LOAD_CART_ITEM_SUCCESS":
      return {
        ...state,
        cartItems: action.payload,
        error: "",
      };
    case "ADD_CART_ITEM":
      return {
        ...state,
      };

    case "ERROR":
      return {
        ...state,
        cartItems: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
