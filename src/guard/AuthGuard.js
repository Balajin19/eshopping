import { loginSuccess, logout } from "../store/Action";

export const isAuthenticated = (token) => {
  if (token) return true;
   return false;
};

export const checkLogin = (dispatch) => {
  let tokenDetails = localStorage.getItem("token");
  if (!tokenDetails) {
    dispatch(logout());
  }
  const token = JSON.parse(tokenDetails);
  dispatch(loginSuccess({ token }));
};
