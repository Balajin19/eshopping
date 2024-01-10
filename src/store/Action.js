import axios from "axios";

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

export const loadData = () => {
  return async (dispatch) => {
    dispatch(load());
    if (token) {
      await axios
        .get("http://localhost:8000/user", {
          headers: { Authorization: token },
        })
        .then((res) => {
          dispatch(loadSuccess(res.data));
        })
        .catch((err) => {
          dispatch(error(err));
        });
    }
  };
};

export const registerData = (data, navigate, toast) => {
  return async (dispatch) => {
    dispatch(register(data));
    await axios
      .post("http://localhost:8000/register", data)
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
      .post("http://localhost:8000/login", data)
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
export const updatedProfile = (data, navigate, toast) => {
  return async (dispatch) => {
    dispatch(updateData(data));
    await axios
      .put("http://localhost:8000/update-profile", data)
      .then((res) => {
        dispatch(updateDataSuccess(res.data));
        toast.success("Profile updated Successfully!");
        navigate("/dashboard/user");
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

