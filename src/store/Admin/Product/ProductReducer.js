export const initialState = {
  data: [],
  error: "",
  keyword: "",
  results: [],
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_PRODUCT_DATA":
      return {
        ...state,
      };
    case "LOAD_PRODUCT_DATA_SUCCESS":
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case "GET_PRODUCT_DATA":
      return {
        ...state,
      };
    case "GET_PRODUCT_DATA_SUCCESS":
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case "CREATE_PRODUCT_DATA":
      return {
        ...state,
      };
    case "UPDATE_PRODUCT_DATA":
      return {
        ...state,
      };
    case "SEARCH_PRODUCT_DATA":
      return {
        ...state,
      };
    case "SEARCH_DATA_SUCCESS":
      return {
        ...state,
        keyword: action.keywords,
        results: action.payload,
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
