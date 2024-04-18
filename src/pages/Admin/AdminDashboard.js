import "../index.css";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import { PageTitle } from "../../components/PageTitle";
const API_URL = process.env.REACT_APP_API_URL;

export const AdminDashboard = () => {
  const [error, setError] = useState("");
  const user = useSelector((state) => state.Auth?.data?.user);
  const handleProfilePhoto = async (e) => {
    try {
      const ProfilePhoto = new FormData();
      ProfilePhoto.append("avatar", e.target.files[0]);
      if (e.target.files[0]) {
        const { data } = await axios.put(
          `${API_URL}/profile-photo/${user?._id}`,
          ProfilePhoto
        );
        if (data.success) {
          window.location.reload();
        }
      }
    } catch (err) {
      setError(err);
    }
  };
  return (
    <>
      <PageTitle title={"Admin Dashboard"} />
      {error ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="p-3 mb-2 alert alert-danger text-center">
            <p>Something went wrong!</p>
            <Link onClick={() => window.location.reload()}>
              Please try again!
            </Link>
          </div>
        </div>
      ) : (
        <div className="container-fluid mt-3 mb-5 p-3">
          <div className="row">
            <div className="col-md-3">
              <div className="admin-sidebar">
                <AdminMenu />
              </div>
            </div>
            <div className="col-md-9">
              <div className="card p-4">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <div>
                      <label>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => {
                            handleProfilePhoto(e);
                          }}
                        />
                        <img
                          src={
                            user?.avatar
                              ? `${API_URL}/profile-photo/${user?._id}`
                              : "../images/profile.jpg"
                          }
                          alt={user?.name}
                          className="rounded-circle shadow-5"
                          width="200"
                          height="200"
                          style={{ objectFit: "cover", cursor: "pointer" }}
                        ></img>
                      </label>
                    </div>
                    <div className="mt-4 mb-2">
                      <h4>{user?.name.toUpperCase()}</h4>
                      <p className="text-secondary mb-1">{user?.email}</p>
                      <p className="text-muted font-size-sm">{user?.phone}</p>
                      <p className="text-muted font-size-sm">{user?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
