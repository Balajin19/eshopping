import "./index.css";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Prices } from "../components/Prices";
import { addCart } from "../store/CartActions";
import { SpinnerPage } from "./SpinnerPage";
import { PageTitle } from "../components/PageTitle";
const API_URL = process.env.REACT_APP_API_URL;
export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [products, setProducts] = useState();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [loadProducts, setLoadProducts] = useState(false);
  const user = useSelector((state) => state.Auth?.data?.user);
  const categories = useSelector((state) => state.Categories);

  useEffect(() => {
    getTotal();
  }, []);

  const handleFilter = async (value, id) => {
    let filterCategory = [...checked];
    if (value) {
      filterCategory.push(id);
    } else {
      filterCategory = filterCategory.filter((value) => value !== id);
    }
    setChecked(filterCategory);
  };
  useEffect(() => {
    if (checked.length === 0) allProducts();
  }, [checked.length === 0]);
  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  const allProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/product/product-list/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  const loadmore = async () => {
    try {
      setLoadProducts(true);
      const { data } = await axios.get(
        `${API_URL}/product/product-list/${page}`
      );
      setLoadProducts(false);
      if (data?.success) {
        setProducts([...products, ...data.products]);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      setError(err);
      setLoadProducts(false);
    }
  };
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(API_URL + "/product/product-filters", {
        checked,
        radio,
      });
      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      setError(err);
    }
  };
  const getTotal = async () => {
    try {
      const { data } = await axios.get(API_URL + "/product/product-count");

      if (data?.success) {
        setTotal(data.total);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      setError(err);
    }
  };
  return (
    <>
      <PageTitle title={"E Shopping - Home Page"} />
      {loading ? (
        <SpinnerPage />
      ) : error || categories?.error ? (
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
        <>
          <img src="../images/banner.png" alt="banner" className="banner-img" />
          <div className="row mt-3 w-100">
            <div className="col-md-3">
              <h6 className="text-center">Filter By Category</h6>
              <hr></hr>
              <div className="d-flex flex-column ms-3 mb-3">
                {categories?.data?.map((value) => {
                  return (
                    <Checkbox
                      key={value._id}
                      onChange={(e) =>
                        handleFilter(e.target.checked, value._id)
                      }
                    >
                      {value.name}
                    </Checkbox>
                  );
                })}
              </div>
              <h6 className="text-center">Filter By Price</h6>
              <hr></hr>
              <div className="d-flex flex-column ms-3">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((item) => {
                    return (
                      <div key={item._id}>
                        <Radio value={item.array}>&#8377;{item.name}</Radio>
                      </div>
                    );
                  })}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column ms-3 mt-3">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  RESET FILTERS
                </button>
              </div>
            </div>
            <div className="col-md-9" style={{ minHeight: "100vh" }}>
              {products?.length > 0 ? (
                <>
                  <h1 className="text-center">All Products</h1>
                  <div className="d-flex flex-wrap">
                    {products?.map((item) => {
                      return (
                        <div
                          className="card m-2"
                          style={{ width: "18rem" }}
                          key={item._id}
                        >
                          <img
                            src={
                              item &&
                              `${API_URL}/product/product-photo/${item?._id}`
                            }
                            className="card-img-top"
                            alt={item.name}
                            style={{ aspectRatio: "2/2", objectFit: "cover" }}
                          />
                          <div className="card-body mb-0">
                            <div className="card-title d-flex flex-row justify-content-between">
                              <h5>
                                {item.name.length > 16
                                  ? `${item.name?.substring(0, 16)}...`
                                  : item.name}
                              </h5>
                              <h5 className="text-success fw-bold">
                                &#8377; {item.price}
                              </h5>
                            </div>
                            <p className="card-text">
                              {item.description.length > 27
                                ? `${item.description?.substring(0, 27)}...`
                                : item.description}
                            </p>
                            <button
                              className="btn btn-primary ms-1"
                              onClick={() => navigate(`/product/${item.slug}`)}
                            >
                              More Details
                            </button>
                            <button
                              className="btn btn-secondary ms-1"
                              onClick={() => {
                                if (user) {
                                  dispatch(
                                    addCart(item, user, toast, navigate)
                                  );
                                  return;
                                }
                                toast.error("Please Login to add cart!");
                                navigate("/login");
                              }}
                            >
                              ADD TO CART
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <div className="m-2 p-3">
                      {products && products.length < total && (
                        <button
                          className="btn btn-warning"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(page + 1);
                          }}
                          hidden={checked.length > 0 || radio.length > 0}
                        >
                          {loadProducts ? "Loading..." : "Loadmore"}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "100vh" }}
                >
                  <div className="p-3 mb-2 alert alert-danger text-center">
                    <p>No Product Found!</p>
                    Please{" "}
                    <Link onClick={() => window.location.reload()}>
                      RESET FILTERS
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
