import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { SpinnerPage } from "../../pages/SpinnerPage";
import { Spinner } from "./Spinner";
const API_URL = process.env.REACT_APP_API_URL;
export const PrivateRoute = () => {
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get(API_URL + "/user-auth");
        setAccess(data.access);
      } catch (err) {
        if (err.response?.data?.error?.message === "jwt expired") {
          toast.error("Session expired please login!");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setIsDataLoaded(true);
      }
    };
    authCheck();
  }, [navigate, token]);

  if (!isDataLoaded) return <SpinnerPage />;
  return access ? <Outlet /> : <Spinner path={!token ? "login" : ""} />;
};
