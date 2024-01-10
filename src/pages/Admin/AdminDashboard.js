import { useSelector } from "react-redux";
import { AdminMenu } from "../../components/Layout/AdminMenu";

export const AdminDashboard = () => {
  const user = useSelector((state) => state.Auth.data.user);

  return (
    <>
      <div className="conatainer-fluid m-3 p-3 min-vh-100">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin Name: {user?.name}</h3>
              <h3>Admin Email: {user?.email}</h3>
              <h3>Admin Contact: {user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
