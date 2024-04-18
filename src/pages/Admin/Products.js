import "../index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import { PageTitle } from "../../components/PageTitle";
import { SpinnerPage } from "../SpinnerPage";
const API_URL = process.env.REACT_APP_API_URL;
export const Products = () => {
  const auth = useSelector((state) => state.Auth?.data);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadMoreProducts, setLoadMoreProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}/product/product-list/${page}`
        );
        setLoading(false);
        setProducts(data?.products);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    };
    loadProducts();
    getTotal();
  }, [auth?.token]);
  useEffect(() => {
    const loadmore = async () => {
      try {
        setLoadMoreProducts(true);
        const { data } = await axios.get(
          `${API_URL}/product/product-list/${page}`
        );
        setLoadMoreProducts(false);
        if (data?.success) {
          setProducts([...products, ...data.products]);
        } else {
          toast.error(data?.message);
        }
      } catch (err) {
        setError(err);
        setLoadMoreProducts(false);
      }
    };
    if (page === 1) return;
    loadmore();
  }, [page]);

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
      <PageTitle title={"Products"} />
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
        <div className="container-fluid m-3 p-3 min-vh-100">
          <div className="row">
            <div className="col-md-3">
              <div className="admin-sidebar">
                <AdminMenu />
              </div>
            </div>
            <div className="col-md-9">
              {products?.length > 0 ? (
                <>
                  <h1 className="text-center">PRODUCTS LIST</h1>
                  <div className="d-flex flex-wrap">
                    {products?.map((item) => {
                      return (
                        <Link
                          to={`/dashboard/admin/product/${item.slug}`}
                          className="product-link"
                          key={item._id}
                        >
                          <div className="card m-2" style={{ width: "18rem" }}>
                            <img
                              src={
                                item &&
                                `${API_URL}/product/product-photo/${item?._id}`
                              }
                              className="card-img-top"
                              alt={item.name}
                              width="230"
                              height="230"
                              style={{
                                aspectRatio: "2/2",
                                objectFit: "contain",
                              }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {" "}
                                {item.name.length > 16
                                  ? `${item.name?.substring(0, 16)}...`
                                  : item.name}
                              </h5>
                              <p className="card-text">
                                {item.description.length > 27
                                  ? `${item.description.substring(0, 27)}...`
                                  : item.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>{" "}
                </>
              ) : (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "100vh" }}
                >
                  <div className="p-3 mb-2 alert alert-danger text-center">
                    <p>Products is Empty!</p>
                    <Link to="/dashboard/admin/create-product">
                      ADD PRODUCTS
                    </Link>
                  </div>
                </div>
              )}

              <div className="m-2 p-3">
                {products && products.length < total && (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loadMoreProducts ? "Loading..." : "Loadmore"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
