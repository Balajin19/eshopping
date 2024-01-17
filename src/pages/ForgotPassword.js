import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [otp, setOtp] = useState();
  const [count, setCount] = useState();
  const [access, setAccess] = useState();
  const [otpVerify, setOtpVerify] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (access) {
      const interval = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      count === 0 && clearInterval(interval);
    }
  }, [access, count]);

  const formSubmit = async (e) => {
    e.preventDefault();
    setCount(60);
    try {
      const { data } = await axios.post("http://localhost:8000/generate-otp", {
        email,
      });
      if (data.success) {
        toast.success(data.message);
        setAccess(data.success);
      }
    } catch (err) {
      toast.error(
        err.response?.data
          ? err.response.data.error?.message
          : "Something went wrong"
      );
    }
  };
  const OtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/verify-otp", {
        otp,
      });
      if (data.verify) {
        toast.success(data.message);
        setOtpVerify(data.verify);
      }
    } catch (err) {
      toast.error(
        err.response?.data
          ? err.response.data.error?.message
          : "Something went wrong"
      );
    }
  };
  const handlePassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:8000/change-password",
        {
          email,
          password,
        }
      );
      if (data.success) {
        toast.success("Password changed successfully");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  const comparePassword = (e) => {
    if (e.target.value !== password) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <div className="form-container">
      <div className="form">
        <form onSubmit={formSubmit}>
          <h4>Forgot Password</h4>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your Email"
              value={email || ""}
              required
              onChange={(e) => setEmail(e.target.value)}
              disabled={access}
            />
          </div>
          <button type="submit" className="btn btn-primary" hidden={access}>
            Get OTP
          </button>
        </form>
        <form onSubmit={OtpSubmit} hidden={!access || otpVerify}>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your OTP"
              value={otp || ""}
              required
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button
            className="resendOtp-btn"
            disabled={count > 0}
            onClick={formSubmit}
          >
            {count === 0 ? "Resend OTP" : `Resend OTP after ${count} seconds`}
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <form onSubmit={handlePassword} hidden={!otpVerify}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter New Password"
              value={password || ""}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Confirm Password"
              required
              onInput={(e) => comparePassword(e)}
            />
            {error && <p className="text-danger">Password doesn't match</p>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={error}>
            Change Password
          </button>
        </form>
      </div>
    </div>
    
  );
};
 
