import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement, increament } from "./store";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function NonVegItems() {
  const nonVegItems = useSelector((state) => state.products.nonveg);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let auth = useSelector((state) => state.auth);
  let isAuthenticated = auth.isAuthenticated;

  let cartItems = useSelector((state) => state.cart);

  let perPage = 4;
  let totalPages = Math.ceil(nonVegItems.length / perPage);
  let [pageNumber, setPageNumber] = useState(1);
  const [below300, setBelow300] = useState(false);
  const [above300, setAbove300] = useState(false);

  const handleBelow300Change = () => {
    setBelow300(!below300);
  };

  const handleAbove300Change = () => {
    setAbove300(!above300);
  };

  const filteredItems = nonVegItems.filter((item) => {
    if (below300 && above300) return true; // Show all if both filters are checked
    if (below300) return item.price < 300;
    if (above300) return item.price >= 300;
    return true; // Show all if no filters are applied
  });
  let pageEndIndex = pageNumber * perPage;
  let pageStartIndex = pageEndIndex - perPage;
  let currentItems = filteredItems.slice(pageStartIndex, pageEndIndex);

  let handlePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page);
    }
  };

  return (
    <>
      <div
        className="container mt-4 text-center"
        style={{ paddingLeft: "280px" }}
      >
        <h1 className="mb-5 w-100">Non-Veg Items</h1>
        <label>Apply Filters:</label> &emsp;
        <input
          type="checkbox"
          checked={below300}
          onChange={handleBelow300Change}
        />
        Below 300 &emsp;
        <input
          type="checkbox"
          checked={above300}
          onChange={handleAbove300Change}
        />
        Above 300
        <div className="dis">
          {currentItems.map((item, index) => (
            <div key={index} className="items-container image-container">
              <div>
                <img
                  src={item.image}
                  width={150}
                  height={150}
                  alt={item.name}
                  style={{ marginBottom: "15px" }}
                />
                <div className="m-4">
                  {item.name} - &#8377;{item.price} &emsp;
                </div>
                <div>
                  {cartItems.some((cartitem) => cartitem.name === item.name) ? (
                    <div className="cart-control">
                      <button
                        onClick={() => dispatch(increament(item))}
                        className="btn btn-increment" //btn-action
                      >
                        +
                      </button>
                      <span className="cart-quantity-value">
                        {cartItems.find(
                          (cartitem) => cartitem.name === item.name
                        )?.quantity || 1}
                        {/* {item.quantity} */}
                      </span>
                      <button
                        onClick={() => dispatch(decrement(item))}
                        className="btn btn-decrement"
                      >
                        -
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        isAuthenticated
                          ? dispatch(addToCart(item))
                          : alert("Login in your account");
                      }}
                      className="btn btn-success w-100"
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => handlePage(pageNumber - 1)}
          disabled={pageNumber === 1}
          style={{
            backgroundColor: "pink",
            color: "black",
            borderColor: "black",
            borderRadius: "50px",
          }}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePage(index + 1)}
            style={{
              margin: "0 5px",
              color: "red",
              backgroundColor: pageNumber === index + 1 ? "gray" : "white",
              borderColor: "black",
              borderRadius: "10px",
            }}
          >
            {index + 1}
          </button>
        ))}
        &emsp;
        <button
          onClick={() => handlePage(pageNumber + 1)}
          disabled={pageNumber === totalPages}
          style={{
            backgroundColor: "pink",
            color: "black",
            borderColor: "black",
            borderRadius: "50px",
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default NonVegItems;
