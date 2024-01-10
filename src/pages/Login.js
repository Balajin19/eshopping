import "./index.css";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginData } from "../store/Action";
export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const formSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(loginData(data, navigate, toast, location.state));
  };
  return (
   
    <div className="form-container">
      <form onSubmit={formSubmit} className="form">
        <h3>Login Form</h3>
        <div className="mb-3">
                   <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter your Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
         
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/forgot-password">Forgot password</Link>
      </form>
    </div>
  );
};
