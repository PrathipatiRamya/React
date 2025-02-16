import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement, increament } from "./store";
import { useState } from "react";

function Milk() {
  let milkItems = useSelector((state) => state.products.milk);
  let dispatch = useDispatch();

  let auth = useSelector((state) => state.auth);
  let isAuthenticated = auth.isAuthenticated;
  let cartItems = useSelector((state) => state.cart);
  let perPage = 4;
  let totalPages = Math.ceil(milkItems.length / perPage);
  let [pageNumber, setPageNumber] = useState(1);
  const [below30, setBelow30] = useState(false);
  const [above30, setAbove30] = useState(false);

  const handleBelow300Change = () => {
    setBelow30(!below30);
  };

  const handleAbove300Change = () => {
    setAbove30(!above30);
  };

  const filteredItems = milkItems.filter((item) => {
    if (below30 && above30) return true; // Show all if both filters are checked
    if (below30) return item.price < 30;
    if (above30) return item.price >= 30;
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
  // let allItems = milk.map((item, index) => (
  //   <div className="items-container image-container ">
  //     <div>
  //       <img src={item.image} width={150} height={150} />
  //       <div key={index} className="m-4 ">
  //         {item.name} - &#8377;{item.price} &emsp;
  //         <button
  //           onClick={() => dispatch(addToCart(item))}
  //           className="btn btn-success w-100 "
  //         >
  //           AddToCart
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // ));

  return (
    <>
      <div
        className="container mt-4 text-center"
        style={{ paddingLeft: "250px" }}
      >
        <h1 className="mb-5 w-100">Milk Items</h1>
        <label>Apply Filters:</label> &emsp;
        <input
          type="checkbox"
          checked={below30}
          onChange={handleBelow300Change}
        />
        Below 30 &emsp;
        <input
          type="checkbox"
          checked={above30}
          onChange={handleAbove300Change}
        />
        Above 30
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
              borderRadius: "10px",
              borderColor: "black",
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

export default Milk;
