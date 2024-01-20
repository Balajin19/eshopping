import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";

export const Categories = () => {
  const categories = useSelector( ( state ) => state.Categories );
  return (
    <>
      <PageTitle title={"E Shopping - Categories"} />
      <div className="container" style={{ minHeight: "70vh" }}>
        <div className="row mb-4">
          {categories?.error ? (
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
              {categories?.data?.map((value) => {
                return (
                  <div
                    className="col-md-4 col-6 mt-5 mb-3 gx-3 gy-3"
                    key={value._id}
                  >
                    <Link
                      to={`/category/${value.slug}`}
                      className="btn btn-secondary p-4 w-100 fs-4"
                    >
                      {value.name.toUpperCase()}
                    </Link>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};
