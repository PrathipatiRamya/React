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

function Cart() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let cartItems = useSelector((state) => state.cart);
  let finalItems = cartItems.map((item, index) => (
    <li key={index} className="cart-items list-group-item">
      <span className="fw-bold">{item.name}</span> - &#8377;{item.price} &emsp;
      <button
        onClick={() => dispatch(increament(item))}
        className="btn btn-action btn-increment"
      >
        +
      </button>
      &emsp;<span className="fw-bold">Quantity: {item.quantity}</span> &emsp;
      <button
        onClick={() => dispatch(decrement(item))}
        className="btn btn-action btn-decrement"
      >
        -
      </button>
      &emsp;
      <button
        onClick={() => dispatch(removeFromCart(item))}
        className="btn btn-action btn-remove"
      >
        Remove
      </button>
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
    let purchaseDate = new Date().toLocaleDateString();
    let purchaseItems = {
      items: [...cartItems],
      finalPrice: finalAmount,
      date: purchaseDate,
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
              Your Net amount to pay : &#8377;{finalAmount}
            </p>

            <button onClick={() => handlePurchase()} className="purchase-btn">
              Complete Purchase
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate("/home")} className="btn btn-success">
            Browse Products
          </button>
        </div>
      )}
    </>
  );
}
export default Cart;
