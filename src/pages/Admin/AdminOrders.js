import { Select } from "antd";
import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import { SpinnerPage } from "../SpinnerPage";
const { Option } = Select;
export const AdminOrders = () => {
  const auth = useSelector((state) => state.Auth?.data);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    getAllOrders();
  }, [auth?.token]);
  const getAllOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8000/order/allOrders");
      setLoading(false);
      setOrders(data?.orders);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };
  const handleChange = async (id, value) => {
    try {
      await axios.put(`http://localhost:8000/order/status/${id}`, {
        status: value,
      });
    } catch (err) {
      setError(err);
    }
  };
  return (
    <>
      {loading ? (
        <SpinnerPage />
      ) : error ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="p-3 mb-2 alert alert-danger text-center">
            <p>Something went wrong!</p>
            <Link onClick={() => window.location.reload()}>
              Please try again!
            </Link>
          </div>
        </div>
      ) : (
        <div className="conatainer-fluid m-3 p-3 min-vh-100">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              {orders.length > 0 ? (
                <>
                  <h1 className="text-center">All Orders</h1>
                  {orders?.map((value, index) => {
                    return (
                      <div className="border shadow" key={value._id}>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Status</th>
                              <th scope="col">Buyer</th>
                              <th scope="col">Date</th>
                              <th scope="col">Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <Select
                                  bordered={false}
                                  onChange={(status) =>
                                    handleChange(value?._id, status)
                                  }
                                  defaultValue={value?.status || ""}
                                >
                                  {status.map((st, index) => {
                                    return (
                                      <Option key={index} value={st}>
                                        {st}
                                      </Option>
                                    );
                                  })}
                                </Select>
                              </td>
                              <td>{value?.buyer?.name}</td>
                              <td>{moment(value?.createdAt).fromNow()}</td>
                              <td>{value?.products?.length}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="container">
                          {value?.products?.map((item) => {
                            return (
                              <div
                                className="row mb-2 p-3 card flex-row"
                                key={item._id}
                              >
                                <div className="col-md-4">
                                  <img
                                    src={
                                      item &&
                                      `http://localhost:8000/product/product-photo/${item?._id}`
                                    }
                                    className="card-img-top"
                                    alt={item.name}
                                    // style={{ aspectRatio: "4/2", objectFit: "cover" }}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <h5>{item.name}</h5>
                                  <p>
                                    {item.description.length > 30
                                      ? `${item.description?.substring(
                                          0,
                                          30
                                        )}...`
                                      : item.description}
                                  </p>
                                  {/* <h5>Quantity : {value.quantity}</h5> */}
                                  {/* <h5>
                          Quantity :{" "}
                          <button
                            className="qty-btn"
                            onClick={() =>
                              qtyUpdate(
                                value?._id,
                                "decrement",
                                value?.quantity
                              )
                            }
                            disabled={value?.quantity === 1}
                          >
                            -
                          </button>
                          {value?.quantity}
                          <button
                            className="qty-btn text-center"
                            onClick={() =>
                              qtyUpdate(
                                value?._id,
                                "increment",
                                value?.quantity
                              )
                            }
                          >
                            +
                          </button>
                        </h5> */}
                                  <h4>Price : &#8377; {item.price}</h4>
                                  {/* <button
                          className="btn btn-danger"
                          onClick={() => removeCartItem(value)}
                        >
                          Remove
                        </button> */}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "100vh" }}
                >
                  <div className="p-3 mb-2 alert alert-danger text-center">
                    <p>No Orders!</p>
                    <Link to="/">Back to home</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};
