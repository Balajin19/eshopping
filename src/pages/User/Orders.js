import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserMenu } from "../../components/Layout/UserMenu";
import { PageTitle } from "../../components/PageTitle";
import { SpinnerPage } from "../SpinnerPage";
const API_URL = process.env.REACT_APP_API_URL;
export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const auth = useSelector((state) => state.Auth?.data);

  useEffect(() => {
    loadOrders();
  }, [auth?.user?._id]);
  const loadOrders = async () => {
    try {
      if (auth?.user) {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}/order/getOrders/${auth?.user?._id}`
        );
        setLoading(false);
        setOrders(data?.orders);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err);
    }
  };
  const cancelOrder = async (value) => {
    try {
      if (value?.status !== "Cancel") {
        setLoading(true);
        const { data } = await axios.delete(
          `${API_URL}/order/cancel-Orders/${value?._id}`
        );
        if (data.success) {
          setLoading(false);
          loadOrders();
        }
        return;
      }
      setLoading(true);
      const { data } = await axios.delete(
        `${API_URL}/order/remove-Orders/${value?._id}`
      );
      if (data.success) {
        setLoading(false);
        loadOrders();
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };
  return (
    <>
      <PageTitle title={"E Shopping - Orders"} />
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
        <div className="container-fluid mt-3 p-3 min-vh-100">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              {orders?.length > 0 ? (
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
                              <th scope="col">Products</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{value?.status}</td>
                              <td>{value?.buyer.name}</td>
                              <td>{moment(value?.createdAt).fromNow()}</td>
                              <td>{value?.products?.length}</td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => cancelOrder(value)}
                                >
                                  {value?.status === "Cancel"
                                    ? "Remove"
                                    : "Cancel"}
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div
                          className="container"
                          style={{ minHeight: "auto" }}
                        >
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
                                      `${API_URL}/product/product-photo/${item?._id}`
                                    }
                                    className="card-img-top"
                                    alt={item.name}
                                    style={{
                                      aspectRatio: "3/2",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <h5>{item.name}</h5>
                                  <p>{item.description}</p>
                                  <h4>Price : &#8377; {item.price}</h4>
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
      )}
    </>
  );
};
