import { useDispatch, useSelector } from "react-redux";
import store, { addToCart } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function VegItems() {
  //take theproducts from store by using useSelector()
  let vegItems = useSelector((state) => state.products.veg);

  //craete object for useDispatch() for taking the actions from reducers
  let dispatch = useDispatch();
  // let cartItems = useSelector((state) => state.cart);
  // let cartItem = 0;
  let perPage = 4;
  let totalPages = Math.ceil(vegItems.length / perPage);
  let [pageNumber, setPageNumber] = useState(1);
  let pageEndIndex = pageNumber * perPage;
  let pageStartIndex = pageEndIndex - perPage;
  let currentItems = vegItems.slice(pageStartIndex, pageEndIndex);
  let handlePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page);
    }
  };

  let allItems = currentItems.map((item, index) => (
    // cartItem = cartItems.find((cartItem) => cartItem.name === item.name);
    <div className="items-container image-container ">
      <div>
        <img src={item.image} width={150} height={150} />
        <div key={index}>
          {item.name} - &#8377;{item.price} &emsp;
          {/* {!cartItem ? ( */}
          <button
            onClick={() => dispatch(addToCart(item))}
            className="btn btn-success w-100 "
          >
            AddToCart
          </button>
          {/* ) : (
            <button>2</button>
          )} */}
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="container mt-4 text-center">
        <h1 className="mb-5 w-100">Veg Items</h1>
        <div className="dis ">{allItems}</div>
        <button
          onClick={() => handlePage(pageNumber - 1)}
          disabled={pageNumber === 1}
          style={{
            backgroundColor: "pink",
            color: "black",
            borderColor: "black",
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
              backgroundColor: pageNumber === index + 1 ? "gray" : "black",
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
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
export default VegItems;
