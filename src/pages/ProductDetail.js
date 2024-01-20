import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { addCart } from "../store/CartActions";
import { SpinnerPage } from "./SpinnerPage";
const API_URL = process.env.REACT_APP_API_URL;
export const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const user = useSelector((state) => state.Auth?.data?.user);

  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/product/get-product/${params.slug}`
      );
      setLoading(false);
      getSimilarProducts(data.product?._id, data.product?.category?._id);
      if (data?.success) {
        setProduct(data.product);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/product/related-products/${pid}/${cid}`
      );
      if (data?.success) {
        setRelatedProducts(data?.relatedProducts);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <>
      <PageTitle
        title={`${loading ? "E Shopping - Product" : product?.name}`}
      />
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
        <div style={{ minHeight: "70vh" }}>
          <div className="row mt-4 w-100">
            <div className="col-md-6">
              <img
                src={
                  product && `${API_URL}/product/product-photo/${product?._id}`
                }
                className="card-img-top"
                alt={product?.name}
                width={"350px"}
                height="300px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="col-md-6">
              <h1 className="text-center">Product Details</h1>
              <hr></hr>
              <h5>Name : {product?.name}</h5>
              <h5>Description : {product?.description}</h5>
              <h5>Category : {product?.category?.name}</h5>
              <h5>Price : &#8377; {product?.price}</h5>
              <button
                className="btn btn-primary ms-1 mt-2 w-50"
                onClick={() => {
                  if (user) {
                    dispatch(addCart(product, user, toast, navigate));
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
          <hr></hr>
          <div className="row m-2 mb-4">
            <h1>Similar Products</h1>
            {relatedProducts?.length < 1 && (
              <p className="text-center">No Similar Products Found</p>
            )}
            <div className="d-flex flex-wrap">
              {relatedProducts?.map((item) => {
                return (
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={item?._id}
                  >
                    <img
                      src={
                        item && `${API_URL}/product/product-photo/${item?._id}`
                      }
                      className="card-img-top"
                      alt={item?.name}
                      width="250"
                      height="250"
                      style={{ aspectRatio: "2/2", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <div className="card-title d-flex flex-row justify-content-between">
                        <h5>
                          {item?.name.length > 16
                            ? `${item.name?.substring(0, 16)}...`
                            : item.name}
                        </h5>
                        <h5 className="text-success">&#8377; {item.price}</h5>
                      </div>
                      <p className="card-text">
                        {item?.description?.length > 27
                          ? `${item.description?.substring(0, 27)}...`
                          : item.description}
                      </p>
                      <button
                        className="btn btn-primary ms-1"
                        onClick={() => navigate(`/product/${item?.slug}`)}
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
        </div>
      )}
    </>
  );
};
