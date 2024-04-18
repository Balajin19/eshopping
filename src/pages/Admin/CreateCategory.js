import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {  useDispatch, useSelector } from "react-redux";
import { CategoryForm } from "../../components/Form/CategoryForm";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import { Modal } from "antd";
import axios from "axios";
import { loadCategories } from "../../store/Admin/Category/CategoryActions";
import { SpinnerPage } from "../SpinnerPage";
import { PageTitle } from "../../components/PageTitle";
const API_URL = process.env.REACT_APP_API_URL;
export const CreateCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Categories);
  useEffect(() => {
    dispatch(loadCategories(toast));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const value = { name: name.charAt(0).toUpperCase() + name.slice(1) };
      const { data } = await axios.post(
        API_URL + "/category/create-category",
        value
      );
      if (data.success) {
        setLoading(false);
        toast.success(`${name} category added`);
        dispatch(loadCategories(toast));
      }
    } catch (err) {
      if (err.response?.data) {
        toast.error(
          err.response?.data?.error?.message || "Something went wrong"
        );
      } else {
        toast.error("Something went wrong in creating categories");
      }
    }
    setName("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedCategory = { name: value };
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API_URL}/category/update-category/${selected._id}`,
        updatedCategory
      );
      if (data.success) {
        setLoading(false);
        dispatch(loadCategories(toast));
        toast.success(`${value} category updated`);
      }
    } catch (err) {
      if (err.response?.data) {
        toast.error(
          err.response?.data?.error?.message || "Something went wrong"
        );
      } else {
        toast.error("Something went wrong in updating categories");
      }
    }
    setValue("");
    setSelected(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (name, id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${API_URL}/category/delete-category/${id}`
      );
      if (data.success) {
        setLoading(false);
        dispatch(loadCategories(toast));
        toast.success(`${name} category deleted`);
      }
    } catch (err) {
      if (err.response?.data) {
        toast.error(
          err.response?.data?.error?.message || "Something went wrong"
        );
      } else {
        toast.error("Something went wrong in deleting categories");
      }
    }
  };
  return (
    <>
      <PageTitle title={"Create Category"} />
      {loading ? (
        <SpinnerPage />
      ) : (
        <div className="container-fluid m-3 p-3 min-vh-100">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Create Category</h1>
              <CategoryForm
                name={name}
                setName={setName}
                handleSubmit={handleSubmit}
              />
              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.data?.map((value) => {
                      return (
                        <tr key={value._id}>
                          <td>{value.name}</td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setIsModalOpen(true);
                                setValue(value.name);
                                setSelected(value);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => {
                                handleDelete(value.name, value._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Modal
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                open={isModalOpen}
              >
                <CategoryForm
                  name={value}
                  setName={setValue}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

