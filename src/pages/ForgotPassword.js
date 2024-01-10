import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
export const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [count, setCount] = useState(5);
  const [access, setAccess] = useState();
  const [otpVerify, setOtpVerify] = useState();
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
    try {
      const { data } = await axios.post("http://localhost:8000/generate-otp", {
        email,
      });
      toast.success("OTP sent to your registered email");
      if (data.success) {
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
        toast.success("OTP verified");
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
              value={otp || ''}
              required
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <Link onClick={formSubmit} disabled={count > 0}>
            {count === 0 ? "Resend OTP" : `Resend OTP after ${count} seconds`}
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <form hidden={!otpVerify}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter New Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Confirm Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};
