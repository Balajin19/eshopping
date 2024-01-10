import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import { SpinnerPage } from "../SpinnerPage";

export const Products = () => {
  const auth = useSelector((state) => state.Auth?.data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadProducts();
  }, [auth?.token]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:8000/product/all-products"
      );
      setLoading(false);
      setProducts(data.allProducts);
    } catch (err) {
      setLoading(false);
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
                              src={item&&`http://localhost:8000/product/product-photo/${item?._id}`}
                              className="card-img-top"
                              alt={item.name}
                              style={{ aspectRatio: "3/2", objectFit: "cover" }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <p className="card-text">
                                {item.description.length > 30
                                  ? `${item.description.substring(0, 30)}...`
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};
