import { Link, NavLink } from "react-router-dom";

export const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <Link
            to="/dashboard/user"
            className="bg-dark text-light p-3 text-decoration-none fs-4 fw-bold mb-1"
          >
            Dashboard
          </Link>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};
