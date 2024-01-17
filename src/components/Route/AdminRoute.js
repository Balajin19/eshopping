import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner";
const API_URL = process.env.REACT_APP_API_URL;

export const AdminRoute = () => {
  const navigate = useNavigate();
  const [access, setAccess] = useState();
  const token = useSelector((state) => state.Auth.data.token);
  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get(API_URL + "/admin-auth");
        setAccess(data.access);
      } catch (err) {
        if (err.response?.data?.error?.message === "jwt expired") {
          toast.error("Session expired please login!");
          localStorage.removeItem("token");
          navigate("/login");
        }
        console.log(err, "err in admin auth");
      }
    };
    if (token) authCheck();
  }, [token, navigate]);
  return <>{access ? <Outlet /> : <Spinner path={""} />}</>;
};
