export const initialState = {
  data: [],
  error: "",
};

export const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORY_DATA":
      return {
        ...state,
      };
    case "GET_CATEGORY_DATA_SUCCESS":
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case "CREATE_CATEGORY_DATA":
      return {
        ...state,
      };
    case "UPDATE_CATEGORY_DATA":
      return {
        ...state,
      };
    case "DELETE_CATEGORY_DATA":
      return {
        ...state,
      };
    case "ERROR":
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
