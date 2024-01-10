import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner";

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const [access, setAccess] = useState();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/user-auth", {
          headers: { Authorization: token },
        });
        setAccess(data.access);
      } catch (err) {
        console.log(err, "err in user auth");
      }
    };
    if (token) authCheck();
  }, [token, navigate]);
  return <>{access ? <Outlet /> : <Spinner path={"login"} />}</>;
};
