export const initialState = {
  data: "",
  error: "",
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      return {
        ...state,
      };
    case "LOAD_SUCCESS":
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case "REGISTER":
      return {
        ...state,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case "LOGIN":
      return {
        ...state,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case "UPDATE_DATA":
      return {
        ...state,
      };
    case "UPDATE_DATA_SUCCESS":
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case "LOGOUT":
      return {
        data: "",
        error: "",
      };
    case "ERROR":
      return {
        ...state,
        data: "",
        error: action.payload,
      };
    default:
      return state;
  }
};
