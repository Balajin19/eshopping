import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";
export const load = () => {
  return {
    type: "LOAD",
  };
};
export const loadSuccess = (value) => {
  return {
    type: "LOAD_SUCCESS",
    payload: value,
  };
};
export const register = (value) => {
  return {
    type: "REGISTER",
    payload: value,
  };
};
export const registerSuccess = (value) => {
  return {
    type: "REGISTER_SUCCESS",
    payload: value,
  };
};
export const login = (value) => {
  return {
    type: "LOGIN",
    payload: value,
  };
};
export const loginSuccess = (value) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: value,
  };
};
export const updateData = (value) => {
  return {
    type: "UPDATE_DATA",
    payload: value,
  };
};
export const updateDataSuccess = (value) => {
  return {
    type: "UPDATE_DATA_SUCCESS",
    payload: value,
  };
};
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
export const error = (value) => {
  return {
    type: "ERROR",
    payload: value,
  };
};

export const loadData = (toast, navigate) => {
  return async (dispatch) => {
    dispatch(load());
    if (token) {
      await axios
        .get(API_URL + "/user", {
          headers: { Authorization: token },
        })
        .then((res) => {
          dispatch(loadSuccess(res.data));
        })
        .catch((err) => {
          if (err.response?.data?.error?.message === "jwt expired") {
            toast.error("Session expired please login!");
            localStorage.removeItem("token");
            navigate("/login");
          }
          dispatch(error(err));
        });
    }
  };
};

export const registerData = (data, navigate, toast) => {
  return async (dispatch) => {
    dispatch(register(data));
    await axios
      .post(API_URL + "/register", data)
      .then((res) => {
        dispatch(registerSuccess(res.data));
        toast.success("Registered Successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error
            ? err.response?.data?.error?.message
            : "Something went wrong"
        );
        dispatch(error(err));
      });
  };
};
export const loginData = (data, navigate, toast, location) => {
  return async (dispatch) => {
    dispatch(login(data));
    await axios
      .post(API_URL + "/login", data)
      .then((res) => {
        toast.success("Login Successfully!");
        localStorage.setItem("token", JSON.stringify(res.data.token));
        dispatch(loginSuccess(res.data));
        navigate(location || "/");
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error
            ? err.response?.data?.error?.message
            : "Something went wrong"
        );
        dispatch(error(err));
      });
  };
};
export const updatedProfile = (value, navigate, toast) => {
  return async (dispatch) => {
    dispatch(updateData(value));
    await axios
      .put(API_URL + "/update-profile", value)
      .then((res) => {
        if (res.data.success) {
          dispatch(updateDataSuccess(res.data));
          toast.success("Profile updated Successfully!");
          navigate("/dashboard/user");
        }
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error
            ? err.response?.data?.error?.message
            : "Something went wrong"
        );
        dispatch(error(err));
      });
  };
};

