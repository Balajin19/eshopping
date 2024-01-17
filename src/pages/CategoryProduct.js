import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addCart } from "../store/CartActions";
import { SpinnerPage } from "./SpinnerPage";
const API_URL = process.env.REACT_APP_API_URL;

export const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const user = useSelector((state) => state.Auth?.data?.user);

  const getProductsByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/product/product-category/${params.slug}`
      );
      setLoading(false);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };
  useEffect(() => {
    getProductsByCat();
  }, [params?.slug]);
  return (
    <div className="container mt-3" style={{ minHeight: "70vh" }}>
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
        <>
          <h4 className="text-center">
            Category - {category?.name.toUpperCase()}
          </h4>
          <h6 className="text-center">{products?.length} result found</h6>
          <div className="row">
            {products?.length > 0 ? (
              <div className="col-12 offset-1 m-0 mb-5">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  <>
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
                          <div className="card-body">
                            <div className="card-title d-flex flex-row justify-content-between">
                              <h5>
                                {item.name.length > 16
                                  ? `${item.name?.substring(0, 16)}...`
                                  : item.name}
                              </h5>
                              <h5 className="text-success">
                                &#8377; {item.price}
                              </h5>
                            </div>
                            <p className="card-text">
                              {item.description.length > 30
                                ? `${item.description?.substring(0, 30)}...`
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
                              onClick={() =>
                                dispatch(addCart(item, user, toast, navigate))
                              }
                            >
                              ADD TO CART
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                </div>
              </div>
            ) : (
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100vh" }}
              >
                <div className="p-3 mb-2 alert alert-danger text-center">
                  <p>
                    No Products found in {category?.name.toUpperCase()}{" "}
                    category!
                  </p>
                  <Link to="/">Back to home</Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
