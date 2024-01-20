import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Spinner = ({ path }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setTimeout(() => {
      setCount((prevalue) => --prevalue);
    }, 1000);
    count === 0 && navigate(`/${path}`, { state: location.pathname });
  }, [count, navigate, location, path]);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="text-center">
        redirected you to {path === "login" ? "Login" : "Home"} page in {count}{" "}
        seconds
      </h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
