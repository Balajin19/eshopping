import axios from "axios";
import { loadCategories } from "../Category/CategoryActions";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";
export const loadProductData = () => {
  return {
    type: "LOAD_PRODUCT_DATA",
  };
};
export const loadProductDataSuccess = (values) => {
  return {
    type: "LOAD_PRODUCT_DATA_SUCCESS",
    payload: values,
  };
};
export const getProductData = () => {
  return {
    type: "GET_PRODUCT_DATA",
  };
};
export const getProductDataSuccess = (values) => {
  return {
    type: "GET_PRODUCT_DATA_SUCCESS",
    payload: values,
  };
};

export const createProductData = () => {
  return {
    type: "CREATE_PRODUCT_DATA",
  };
};
export const updateProductData = () => {
  return {
    type: "UPADTE_PRODUCT_DATA",
  };
};
export const searchProductData = () => {
  return {
    type: "SEARCH_PRODUCT_DATA",
  };
};
export const searchDataSuccess = (keyword, values) => {
  return {
    type: "SEARCH_DATA_SUCCESS",
    payload: values,
    keywords: keyword,
  };
};
export const error = (error) => {
  return {
    type: "ERROR",
    payload: error,
  };
};

export const loadProducts = (toast) => {
  return async (dispatch) => {
    dispatch(loadProductData());
    await axios
      .get("http://localhost:8000/product/all-products")
      .then((res) => {
        dispatch(loadProductDataSuccess(res.data.allProducts));
      })
      .catch((err) => {
        dispatch(error(err));
        toast.error("Something went wrong in getting products");
      });
  };
};

export const createProduct = (data, toast) => {
  return async (dispatch) => {
    dispatch(createProductData());
    await axios
      .post("http://localhost:8000/product/create-product", data)
      .then((res) => {
        dispatch(loadCategories(toast));
        toast.success(`${data.name} category added`);
      })
      .catch((err) => {
        dispatch(error(err));
        if (err.response) {
          toast.error(
            err.response?.data?.error?.message || "Something went wrong"
          );
        } else {
          toast.error("Something went wrong in getting categories");
        }
      });
  };
};
export const updateProduct = (data, toast, selected) => {
  return async (dispatch) => {
    dispatch(updateProductData(data));
    await axios
      .put(
        `http://localhost:8000/category/update-product/${selected._id}`,
        data
      )
      .then((res) => {
        dispatch(loadCategories(toast));
        toast.success(`${data.name} product updated`);
      })
      .catch((err) => {
        dispatch(error(err));
        if (err.response?.data) {
          toast.error(
            err.response?.data?.error?.message || "Something went wrong"
          );
        } else {
          toast.error("Something went wrong in getting categories");
        }
      });
  };
};
export const searchProduct = (keyword) => {
  return async (dispatch) => {
    dispatch(searchProductData());
    await axios
      .get(`http://localhost:8000/product/search/${keyword}`)
      .then((res) => {
        dispatch(searchDataSuccess(keyword, res.data));
      })
      .catch((err) => {
        dispatch(error(err));
      });
  };
};
