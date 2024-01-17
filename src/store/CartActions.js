import axios from "axios";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";
  const API_URL = process.env.REACT_APP_API_URL;
  export const loadCartItem = () => {
    return {
      type: "LOAD_CART_ITEM",
    };
  };
  export const loadCartItemSuccess = (value) => {
    return {
      type: "LOAD_CART_ITEM_SUCCESS",
      payload: value,
    };
  };
  export const addCartItem = () => {
    return {
      type: "ADD_CART_ITEM",
    };
  };
  export const addCartItemSuccess = (value) => {
    return {
      type: "ADD_CART_ITEM_SUCCESS",
      payload: value,
    };
  };
  export const error = (error) => {
    return {
      type: "ERROR",
      payload: error,
    };
  };

  export const loadCartData = (user, toast) => {
    return async (dispatch) => {
      dispatch(loadCartItem());
      if (user) {
        await axios
          .get(`${API_URL}/get-cartItems/${user?._id}`)
          .then((res) => {
            dispatch(loadCartItemSuccess(res.data?.user?.cartItems));
          })
          .catch((err) => {
            dispatch(error(err));
          });
      }
    };
  };

  export const addCart = (value, user, toast, navigate) => {
    return async (dispatch) => {
      dispatch(addCartItem());
      await axios
        .post(`${API_URL}/add-cartItem/${user?._id}`, value)
        .then((res) => {
          if (res.data?.success) {
            dispatch(loadCartData(user, toast));
            toast.success(res.data?.message);
            navigate("/cart");
          }
        })
        .catch((err) => {
          if (err.response?.data) {
            toast.error(err.response?.data?.error?.message);
          } else {
            toast.error("Something went wrong!");
          }
        });
    };
  };
