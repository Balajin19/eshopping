import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import { Select } from "antd";
import axios from "axios";
import { loadCategories } from "../../store/Admin/Category/CategoryActions";
import { PageTitle } from "../../components/PageTitle";
const { Option } = Select;
const API_URL = process.env.REACT_APP_API_URL;
export const UpdateProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [shipping, setShipping] = useState();
  const [photo, setPhoto] = useState();
  const [id, setId] = useState();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.Categories);

  
  useEffect(() => {
    const getProduct = async () => {
      dispatch(loadCategories());
      const { data } = await axios.get(
        `${API_URL}/product/get-product/${params.slug}`
      );
      setId(data.product?._id);
      setName(data.product?.name);
      setDescription(data.product?.description);
      setPrice(data.product?.price);
      setQuantity(data.product?.quantity);
      setShipping(data.product?.shipping);
      setCategory(data.product?.category?._id);
    };
    getProduct();
  }, [dispatch, params.slug]);

  const handleUpdate = async (e) => {
    try {
      const product = new FormData();
      product.append("name", name);
      product.append("description", description);
      product.append("price", price);
      product.append("quantity", quantity);
      product.append("shipping", shipping);
      product.append("category", category);
      photo && product.append("photo", photo);
      e.preventDefault();
      const { data } = await axios.put(
        `${API_URL}/product/update-product/${id}`,
        product
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure to delete the product?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${API_URL}/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success("Product deleted Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <PageTitle title={"Update Product"} />
      <div className="container-fluid m-3 p-3 min-vh-100">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                className="form-select mb-3 p-0"
                onChange={(value) => setCategory(value)}
                value={category || ""}
              >
                {categories?.data?.map((value) => {
                  return (
                    <Option key={value._id} value={value._id}>
                      {value.name}
                    </Option>
                  );
                })}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}

                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={photo.name}
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={id && `${API_URL}/product/product-photo/${id}`}
                      alt="product"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  placeholder="Decription"
                  className="form-control"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Price"
                  className="form-control"
                  value={price || ""}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="form-control"
                  value={quantity || ""}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Shipping"
                  size="large"
                  className="form-select mb-3 p-0"
                  value={shipping ? "Yes" : "No" || ""}
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

