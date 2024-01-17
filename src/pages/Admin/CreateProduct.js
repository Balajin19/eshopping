import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import { loadCategories } from "../../store/Admin/Category/CategoryActions";
const API_URL = process.env.REACT_APP_API_URL;
const { Option } = Select;
export const CreateProduct = () => {
  const categories = useSelector((state) => state.Categories);
  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [shipping, SetShipping] = useState();
  const [photo, setPhoto] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadCategories(toast));
  }, [dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const product = new FormData();
      product.append("name", name);
      product.append("description", description);
      product.append("price", price);
      product.append("quantity", quantity);
      product.append("shipping", shipping);
      product.append("category", category);
      product.append("photo", photo);
      const { data } = await axios.post(
        API_URL + "/product/create-product",
        product
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
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
      <div className="conatainer-fluid m-3 p-3 min-vh-100">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={photo.name}
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
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => SetShipping(value)}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
