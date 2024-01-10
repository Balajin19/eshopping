import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner";

export const AdminRoute = () => {
  const navigate = useNavigate();
  const [access, setAccess] = useState();
  const token = useSelector((state) => state.Auth.data.token);
  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/admin-auth");
        setAccess(data.access);
      } catch (err) {
        console.log(err, "err in admin auth");
      }
    };
    if (token) authCheck();
  }, [token, navigate]);
  return <>{access ? <Outlet /> : <Spinner path={""} />}</>;
};
