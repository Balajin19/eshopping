import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const navigate = useNavigate();
  const searchData = useSelector((state) => state.Products);
  return (
    <div className="container" style={{ minHeight: "70vh" }}>
      <div>
        <h1 className="text-center">Search Results</h1>
        <h6 className="text-center">
          {searchData.results?.length < 1
            ? "No Products Found"
            : `Found ${searchData.results?.searchProducts?.length}`}
        </h6>
        <div className="d-flex flex-wrap mt-4">
          {searchData.results?.searchProducts?.map((item) => {
            return (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={item._id}
              >
                <img
                  src={item&&`http://localhost:8000/product/product-photo/${item?._id}`}
                  className="card-img-top"
                  alt={item.name}
                  style={{ aspectRatio: "4/2", objectFit: "cover" }}
                />
                <div className="card-body">
                  <div className="card-title d-flex flex-row justify-content-between">
                    <h5>{item.name}</h5>
                    <h5 className="text-success">&#8377; {item.price}</h5>
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
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
