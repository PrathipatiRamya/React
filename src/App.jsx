import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import VegItems from "./VegItems";
import NonVegItems from "./NonVegItems";
import Cart from "./cart";
import Orders from "./Orders";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

import Milk from "./Milk";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store";
import Login from "./Login";
import NotFound from "./notfound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  FaHome,
  FaLeaf,
  FaFish,
  FaCartPlus,
  FaBox,
  FaInfoCircle,
  FaPhoneAlt,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { GiChickenLeg, GiMilkCarton } from "react-icons/gi";

function App() {
  let cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  let auth = useSelector((state) => state.auth);
  let isAuthenticated = auth.isAuthenticated;
  let user = auth.user;
  let dispatch = useDispatch();

  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light  shadow-sm p-3 mb-4 fixed-top ">
          <div className="container-fluid">
            <Link to="/home" className="navbar-brand fw-bold linkstyle">
              <FaHome className="me-2" /> Home
            </Link>
            <Link to="/veg" className="navbar-brand fw-bold linkstyle">
              <FaLeaf className="me-2" /> VegItems
            </Link>
            <Link to="/nonveg" className="navbar-brand fw-bold linkstyle">
              <GiChickenLeg className="me-2" /> NonVegItems
            </Link>
            <Link to="/milk" className="navbar-brand fw-bold linkstyle">
              <GiMilkCarton className="me-2" /> Milk Items
            </Link>
            <Link to="/cart" className="navbar-brand fw-bold linkstyle">
              <FaCartPlus className="me-2" /> Cart
              <sup>
                <span style={{ color: "red" }}>{totalItems}</span>
              </sup>
            </Link>
            <Link to="/orders" className="navbar-brand fw-bold linkstyle">
              <FaBox className="me-2" />
              Orders
            </Link>
            <Link to="/aboutus" className="navbar-brand fw-bold linkstyle">
              <FaInfoCircle className="me-2" /> AboutUs
            </Link>
            <Link to="/contactus" className="navbar-brand fw-bold linkstyle">
              <FaPhoneAlt className="me-2" /> ContactUs
            </Link>
            {isAuthenticated ? (
              <div>
                <span>Welcome, {user}!</span>
                <button
                  onClick={() => dispatch(logout())}
                  className="btn btn-outline-danger ms-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-primary ms-2">
                SignIn
              </Link>
            )}
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/veg" element={<VegItems />} />
            <Route path="/nonveg" element={<NonVegItems />} />
            <Route path="/milk" element={<Milk />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
export default App;
