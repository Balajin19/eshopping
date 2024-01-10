import { Badge } from "antd";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../guard/AuthGuard";
import { logout } from "../store/Action";
import { loadCategories } from "../store/Admin/Category/CategoryActions";
import { loadCartData } from "../store/CartActions";
import "./index.css";
import { SearchInput } from "./SearchInput";
export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.Categories);
  const cart = useSelector((state) => state.Cart);
  const auth = useSelector((state) => state.Auth?.data);
  const isAuth = useSelector((state) => isAuthenticated(auth?.token));
  console.log(isAuth, "auth");
  useEffect(() => {
    dispatch(loadCategories(toast));
    dispatch(loadCartData(auth?.user, toast));
  }, [auth?.user, dispatch]);

  const handleLogout = () => {
    toast.success("Logout Successfully!");
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            🛒 Shopping App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to={"/"}
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.data?.map((value) => {
                    return (
                      <li key={value._id}>
                        <Link
                          className="dropdown-item"
                          to={`/category/${value.slug}`}
                        >
                          {value.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>

              {!isAuth ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      to="/"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      role="button"
                    >
                      {auth.user?.name}
                    </Link>
                    <ul className="dropdown-menu" style={{ left: "-25px" }}>
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          onClick={handleLogout}
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item d-flex align-items-center">
                    <Badge count={cart.cartItems?.length} showZero>
                      <NavLink to="/cart" className="nav-link">
                        Cart
                      </NavLink>
                    </Badge>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
