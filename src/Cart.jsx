import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrement,
  increament,
  purchaseList,
  removeFromCart,
} from "./store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { FaRegSmileBeam } from "react-icons/fa";

function Cart() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let cartItems = useSelector((state) => state.cart);
  let finalItems = cartItems.map((item, index) => (
    <li key={index} className="cart-items list-group-item">
      <img src={item.image} className="cart-item-image" />
      <span className="fw-bold cart-item-info">{item.name}</span> - &#8377;
      {item.price} &emsp;
      <div className="cart-quantity">
        <div className="cart-control2 ">
          <button
            onClick={() => dispatch(increament(item))}
            className="btn btn-action btn-increment"
          >
            +
          </button>
          <span className="cart-quantity-value">{item.quantity}</span>
          <button
            onClick={() => dispatch(decrement(item))}
            className="btn btn-action btn-decrement"
          >
            -
          </button>
        </div>
        <button
          onClick={() => dispatch(removeFromCart(item))}
          className="btn btn-action btn-remove"
        >
          Remove
        </button>
      </div>
    </li>
  ));

  //calculate the total price
  let totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  //set the discount percentage

  let [discountPercentage, setDiscountPercentage] = useState(0);
  let [discountApplied, setDiscountApplied] = useState(false);

  //calcualte the discount amount
  let discountAmount = (totalPrice * discountPercentage) / 100;

  //calculate the final amount to pay
  let finalAmount = totalPrice - discountAmount;

  //get the coupon code
  let [couponCode, setCouponCode] = useState("");

  //set the coupon percentage initially zero
  let [couponDiscountPercentage, setCouponDiscountPercentage] = useState(0);

  let [couponApplied, setCouponApplied] = useState(false);
  //calculate the discount percentage
  let handleCoupon = () => {
    switch (couponCode.toUpperCase()) {
      case "RATAN10":
        setCouponDiscountPercentage(10);
        setCouponApplied(true);
        break;
      case "RATAN20":
        setCouponDiscountPercentage(20);
        setCouponApplied(true);
        break;
      case "RATAN30":
        setCouponDiscountPercentage(30);
        setCouponApplied(true);
        break;
      case "RATAN40":
        setCouponDiscountPercentage(140);
        setCouponApplied(true);
        break;
      default:
        alert("Invalid Coupon code");
        setCouponDiscountPercentage(0);
        setCouponApplied(false);
    }
  };

  let couponAmount = (totalPrice * couponDiscountPercentage) / 100;

  finalAmount = finalAmount - couponAmount;

  let handlePurchase = () => {
    const currentDate = new Date();
    let purchaseDate = new Date().toLocaleDateString("en-IN"); // Example: 05/02/2025
    const formattedTime = currentDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }); // Example: 10:30:15 PM

    let purchaseItems = {
      items: [...cartItems],
      finalPrice: finalAmount.toFixed(2),
      date: purchaseDate,
      time: formattedTime,
    };
    dispatch(purchaseList(purchaseItems));
    dispatch(clearCart());
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="cart-container container mt-4">
          <h2 className="text-center">Your Cart</h2>
          <ul className="list-group">{finalItems}</ul>
          <div className="mt-3">
            <p className="fw-bold">Total Price: &#8377;{totalPrice}</p>
            {discountApplied && (
              <div className="alert alert-info">
                <p>Discount Applied: {discountPercentage}%</p>
                <p>Discount Amount: {discountAmount}</p>
              </div>
            )}
            <div className="discount-section">
              <button
                className="btn btn-primary m-2"
                onClick={() => {
                  setDiscountPercentage(10), setDiscountApplied(true);
                }}
              >
                Apply 10% Discount
              </button>
              <button
                className="btn btn-primary m-2"
                onClick={() => {
                  setDiscountPercentage(20), setDiscountApplied(true);
                }}
              >
                Apply 20% Discount
              </button>
              <button
                className="btn btn-primary m-2"
                onClick={() => {
                  setDiscountPercentage(30), setDiscountApplied(true);
                }}
              >
                Apply 30% Discount
              </button>
            </div>
            <br></br>
            <div className="coupon-section mt-3">
              <input
                type="text"
                className="form-control w-50 mx-auto"
                value={couponCode}
                placeholder="Enter Coupon Code"
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                className="btn btn-warning mt-2"
                onClick={() => handleCoupon()}
              >
                Apply Coupon
              </button>
            </div>

            {couponApplied && (
              <div className="alert alert-success mt-3">
                <p>Your Coupon Code: {couponCode}</p>
                <p>Your coupon Amount: {couponAmount}</p>
              </div>
            )}

            <p className="fw-bold mt-3">
              Your Net amount to pay : &#8377;{finalAmount.toFixed(2)}
            </p>
            <div style={{ paddingLeft: "200px" }}>
              <button
                onClick={() => handlePurchase()}
                style={{
                  backgroundColor: "green",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ paddingLeft: "650px" }}>
          <p>
            Your cart is empty <br /> Let start purchase the Items....
            <FaRegSmileBeam className="me-2" />
          </p>
          <button onClick={() => navigate("/home")} className="btn btn-success">
            Browse Products
          </button>
        </div>
      )}
    </>
  );
}
export default Cart;
