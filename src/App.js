import "./App.css";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Cart } from "./pages/Cart";
import { ProductDetail } from "./pages/ProductDetail";
import { PageNotFound } from "./pages/PageNotFound";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Policy } from "./pages/Policy";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { PrivateRoute } from "./components/Route/PrivateRoute";
import { AdminRoute } from "./components/Route/AdminRoute";
import { ForgotPassword } from "./pages/ForgotPassword";
import { loadData } from "./store/Action";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import { UserDashboard } from "./pages/User/UserDashboard";
import { CreateCategory } from "./pages/Admin/CreateCategory";
import { CreateProduct } from "./pages/Admin/CreateProduct";
import { Orders } from "./pages/User/Orders";
import { Profile } from "./pages/User/Profile";
import { Products } from "./pages/Admin/Products";
import { UpdateProduct } from "./pages/Admin/UpdateProduct";
import { Search } from "./pages/Search";
import { Categories } from "./pages/Categories";
import { CategoryProduct } from "./pages/CategoryProduct";
import { AdminOrders } from "./pages/Admin/AdminOrders";
import { isAuthenticated } from "./guard/AuthGuard";
function App() {
  const auth = useSelector((state) => state.Auth?.data);
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "";
  const dispatch = useDispatch();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) dispatch(loadData());
  }, [auth?.token, dispatch]);
  return (
    <div className="App">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route
          path="/login"
          element={
            !isAuthenticated(auth?.token) ? <Login /> : <Navigate to="/" />
          }
        ></Route>
        <Route
          path="/register"
          element={
            !isAuthenticated(auth?.token) ? <Register /> : <Navigate to="/" />
          }
        ></Route>

        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
