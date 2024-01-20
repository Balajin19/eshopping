import "./index.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { PageTitle } from "../components/PageTitle";
const API_URL = process.env.REACT_APP_API_URL;
export const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();
  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      let datas;

      if (email.includes("@eshoppingadmin.com")) {
        datas = { name, email, password, phone, address, role: 1 };
      } else {
        datas = { name, email, password, phone, address, role: 0 };
      }
      const { data } = await axios.post(API_URL + "/register", datas);
      if (data.success) {
        toast.success("Registered Successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error
          ? err.response?.data?.error?.message
          : "Something went wrong"
      );
    }
  };

  return (
    <>
      <PageTitle title={"Register"} />
      <div className="form-container">
        <form onSubmit={formSubmit} className="form">
          <h3>Register Form</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter your Name"
              value={name || ""}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Email"
              value={email || ""}
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
              value={password || ""}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter your Phone Number"
              value={phone || ""}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter your Address"
              value={address || ""}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
