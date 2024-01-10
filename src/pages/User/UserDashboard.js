import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserMenu } from "../../components/Layout/UserMenu";

export const UserDashboard = () => {
  const [user, setUser] = useState();
  const userData = useSelector((state) => state.Auth?.data?.user);
  useEffect(() => {
    setUser(userData);
  }, []);
  return (
    <>
      <div className="conatainer-fluid m-3 p-3 min-vh-100">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>User Name: {user?.name}</h3>
              <h3>User Email: {user?.email}</h3>
              <h3>User Contact: {user?.phone}</h3>
              <h3>User Address: {user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
