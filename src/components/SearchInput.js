import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { searchProduct } from "../store/Admin/Product/ProductActions";

export const SearchInput = () => {
  const [values, setValues] = useState({ keyword: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.Products);
  useEffect(() => {
    setValues(data);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (values.keyword.length > 0) {
        dispatch(searchProduct(values.keyword));
        navigate("/search");
        setValues({ keyword: "" });
      } else {
        toast.error("Enter the name to search");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form
        className="d-flex"
        style={{ marginRight: "8px" }}
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2 "
          type="search"
          placeholder="Search"
          value={values?.keyword || ''}
          onChange={(e) => setValues({ keyword: e.target.value })}
        />
        <button className="p-1 bg-dark text-light w-50" type="submit">
          Search
        </button>
      </form>
    </>
  );
};
