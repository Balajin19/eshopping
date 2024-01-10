import { Link } from "react-router-dom";
import "./index.css";
export const PageNotFound = () => {
  return (
    <div className="pnf">
      <h1 className="pnf-title">404</h1>
      <h2 className="pnf-heading">OOPS! Page Not Found</h2>
      <Link to="/" className="pnf-btn">
        Go Back
      </Link>
    </div>
  );
};
