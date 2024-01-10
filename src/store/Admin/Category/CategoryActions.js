import axios from "axios";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";
export const getCategoryData = () => {
  return {
    type: "GET_CATEGORY_DATA",
  };
};
export const getCategoryDataSuccess = (values) => {
  return {
    type: "GET_CATEGORY_DATA_SUCCESS",
    payload: values,
  };
};
export const createCategoryData = () => {
  return {
    type: "CREATE_CATEGORY_DATA",
  };
};
export const updateCategoryData = () => {
  return {
    type: "UPADTE_CATEGORY_DATA",
  };
};
export const deleteCategoryData = () => {
  return {
    type: "DELETE_CATEGORY_DATA",
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
export const deleteProductData = () => {
  return {
    type: "DELETE_PRODUCT_DATA",
  };
};

export const error = (error) => {
  return {
    type: "ERROR",
    payload: error,
  };
};

export const loadCategories = (toast) => {
  return async (dispatch) => {
    dispatch(getCategoryData());
    await axios
      .get("http://localhost:8000/category/all-categories")
      .then((res) => {
        dispatch(getCategoryDataSuccess(res.data.allCategories));
      })
      .catch((err) => {
               dispatch(error(err));
        toast.error("Something went wrong in getting categories");
      });
  };
};
export const createCategory = (data, toast) => {
  return async (dispatch) => {
    dispatch(createCategoryData(data));
    await axios
      .post("http://localhost:8000/category/create-category", data)
      .then((res) => {
               dispatch(loadCategories(toast));
        toast.success(`${data.name} category added`);
      })
      .catch((err) => {
        dispatch(error(err));
        if (err.response?.data) {
          toast.error(
            err.response?.data?.error?.message || "Something went wrong"
          );
        } else {
          toast.error("Something went wrong in creating categories");
        }
        dispatch(loadCategories(toast));
      });
  };
};
export const updateCategory = (data, toast, selected) => {
  return async (dispatch) => {
    dispatch(updateCategoryData(data));
    await axios
      .put(
        `http://localhost:8000/category/update-category/${selected._id}`,
        data
      )
      .then((res) => {
        dispatch(loadCategories(toast));
        toast.success(`${data.name} category updated`);
      })
      .catch((err) => {
        dispatch(error(err));
        if (err.response?.data) {
          toast.error(
            err.response?.data?.error?.message || "Something went wrong"
          );
        } 
        dispatch(loadCategories(toast));
      });
  };
};
export const deleteCategory = (data, id, toast) => {
  return async (dispatch) => {
    dispatch(deleteCategoryData());
    await axios
      .delete(`http://localhost:8000/category/delete-category/${id}`)
      .then((res) => {
      
        dispatch(loadCategories(toast));
        toast.success(`${data} category deleted`);
      })
      .catch((err) => {
        dispatch(error(err));
        if (err.response?.data) {
          toast.error(
            err.response?.data?.error?.message || "Something went wrong"
          );
        } else {
          toast.error("Something went wrong in deleting categories");
        }
        dispatch(loadCategories(toast));
      });
  };
};
