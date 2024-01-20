import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { addCart } from "../store/CartActions";
import { SpinnerPage } from "./SpinnerPage";
const API_URL = process.env.REACT_APP_API_URL;
export const Search = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const user = useSelector((state) => state.Auth?.data?.user);
  const searchData = useSelector((state) => state?.Products);
  return (
    <>
      <PageTitle
        title={
          loading ? "Searching Products..." : `Search | ${searchData?.keyword}`
        }
      />
      {loading ? (
        <SpinnerPage />
      ) : (
        <div className="container" style={{ minHeight: "70vh" }}>
          {searchData.results?.searchProducts?.length > 0 ? (
            <div>
              <h1 className="text-center">Search Results</h1>
              <h6 className="text-center">
                Found {searchData.results?.searchProducts?.length} products
              </h6>
              <div className="d-flex flex-wrap justify-content-center align-items-center mt-4 mb-5">
                {searchData.results?.searchProducts?.map((item) => {
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
                        width="250"
                        height="250"
                        style={{ aspectRatio: "2/2", objectFit: "contain" }}
                      />
                      <div className="card-body">
                        <div className="card-title d-flex flex-row justify-content-between">
                          <h5>
                            {item.name.length > 16
                              ? `${item.name?.substring(0, 16)}...`
                              : item.name}
                          </h5>
                          <h5 className="text-success">&#8377; {item.price}</h5>
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
                              dispatch(addCart(item, user, toast, navigate));
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
              </div>
            </div>
          ) : (
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <div className="p-3 mb-2 alert alert-danger text-center">
                <p>No Products found in this search!</p>
                <Link to="/">Back to home</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
