import { Link, NavLink } from "react-router-dom";

export const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <Link
            to="/dashboard/admin"
            className="bg-dark text-light p-3 text-decoration-none fs-4 fw-bold mb-1"
          >
            Admin Panel
          </Link>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};
