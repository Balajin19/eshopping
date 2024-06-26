import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerPage } from "./SpinnerPage";
import { toast } from "react-hot-toast";
import { loadCartData } from "../store/CartActions";
import { PageTitle } from "../components/PageTitle";
const API_URL = process.env.REACT_APP_API_URL;
export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const auth = useSelector((state) => state.Auth?.data);
  useEffect(() => {
    if (auth?.user?._id) {
      const loadCartItems = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `${API_URL}/get-cartItems/${auth?.user?._id}`
          );
          setLoading(false);
          setCart(data.user?.cartItems);
        } catch (error) {
          setErr(error);
          setLoading(false);
        }
      };

      loadCartItems();
    }
  }, [auth?.user?._id]);
  const removeCartItem = async (value) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${API_URL}/delete-cartItem/${auth?.user?._id}`,
        { _id: value._id }
      );
      dispatch(loadCartData(auth.user, toast));
      setLoading(false);
      setCart(data.user?.cartItems);
    } catch (err) {
      setErr(err);
      setLoading(false);
    }
  };

  const totalPrice = () => {
    let total = 0;
    cart?.map((item) => (total = total + item.price));
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };
  const addOrder = async (value) => {
    try {
      const cartItems = cart.map((value) => value._id);
      const { data } = await axios.post(
        `${API_URL}/order/addOrder/${auth?.user?._id}`,
        { cartItems, value }
      );
      if (data.success) {
        toast.success("Ordered Successfully!");
      }
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error?.message === "jwt expired") {
        toast.error("Session expired please login!");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      <PageTitle title={"E Shopping - Cart"} />
      <div className="container" style={{ minHeight: "100vh" }}>
        {loading ? (
          <SpinnerPage />
        ) : err ? (
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
        ) : auth?.token ? (
          cart?.length > 0 ? (
            <>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="text-center bg-light p-2">
                    Hello {auth?.user?.name}
                  </h1>
                  <h4 className="text-center mb-3">
                    {cart?.length > 0
                      ? `You have ${cart?.length} items in your cart`
                      : "Your cart is empty"}
                  </h4>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-8">
                  {cart?.map((item) => {
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
                            width="230"
                            height="200"
                            style={{ aspectRatio: "3/2", objectFit: "contain" }}
                          />
                        </div>
                        <div className="col-md-8">
                          <h5>{item.name}</h5>
                          <p>{item.description}</p>
                          <h4>Price : &#8377; {item.price}</h4>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeCartItem(item)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-md-4 text-center">
                  <h1>Cart Summary</h1>
                  <p>Total | Checkout | Payment</p>
                  <hr />
                  <h4>Total : {totalPrice()}</h4>
                  {auth?.user?.address ? (
                    <>
                      <div className="mb-3 d-flex flex-column">
                        <h4>Current Address</h4>
                        <p>{auth.user?.address}</p>
                        <button
                          className="btn btn-outline-warning mb-3"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setPaymentLoading(true);
                            setTimeout(() => {
                              setPaymentLoading(false);
                              addOrder(auth?.user);
                            }, 3000);
                          }}
                        >
                          {paymentLoading ? "Loading..." : "Make Payment"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-3">
                      {auth?.token ? (
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/login", { state: "/cart" })}
                        >
                          Please Login to checkout
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <div className="p-3 mb-2 alert alert-secondary text-center">
                <h4>
                  Dear <b>{auth?.user?.name.toUpperCase()}</b>,
                </h4>
                Your Cart is Empty! Please <Link to="/">ADD</Link> items!
              </div>
            </div>
          )
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="p-3 mb-2 alert alert-secondary text-center">
              Please <Link to="/login">LOGIN</Link> to checkout!
            </div>
          </div>
        )}
      </div>
    </>
  );
};
