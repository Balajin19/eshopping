import { UserMenu } from "../../components/Layout/UserMenu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatedProfile } from "../../store/Action";
import { toast } from "react-hot-toast";
import "../index.css";
import { PageTitle } from "../../components/PageTitle";
import { Spinner } from "../../components/Route/Spinner";
export const Profile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth?.data?.user);
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
  }, [user.address, user.email, user.name, user.phone]);
  const formSubmit = async (e) => {
    e.preventDefault();
    const values = { name, email, password, phone, address };
    setLoading(true);
    dispatch(updatedProfile(values, navigate, toast));
    setLoading(false);
  };

  return (
    <>
      <PageTitle title={"Profile"} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="conatainer-fluid m-3 p-3 min-vh-100">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="form-container min-vh-100">
                <form onSubmit={formSubmit} style={{ minWidth: "350px" }}>
                  <h3>USER PROFILE</h3>
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
                      disabled
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};
