import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function VegItems() {
  let vegItems = useSelector((state) => state.products.veg);
  let dispatch = useDispatch();

  let auth = useSelector((state) => state.auth);
  let isAuthenticated = auth.isAuthenticated;

  let perPage = 4;
  let totalPages = Math.ceil(vegItems.length / perPage);
  let [pageNumber, setPageNumber] = useState(1);
  let [below100, setBelow100] = useState(false);
  let [above100, setAbove100] = useState(false);

  let handleBelow100Change = () => {
    setBelow100(!below100);
  };

  let handleAbove100Change = () => {
    setAbove100(!above100);
  };

  let filteredItems = vegItems.filter((item) => {
    if (below100 && above100) return true;
    if (below100) return item.price < 50;
    if (above100) return item.price >= 50;
    return true;
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
      <div className="container mt-4 text-center">
        <h1 className="mb-5 w-100">Veg Items</h1>
        <label>Apply Filters:</label> &emsp;
        <input
          type="checkbox"
          checked={below100}
          onChange={handleBelow100Change}
        />
        Below 50 &emsp;
        <input
          type="checkbox"
          checked={above100}
          onChange={handleAbove100Change}
        />
        Above 50
        <div className="dis">
          {currentItems.map((item, index) => (
            <div key={index} className="items-container image-container">
              <div>
                <img
                  src={item.image}
                  width={150}
                  height={150}
                  alt={item.name}
                />
                <div>
                  {item.name} - &#8377;{item.price} &emsp;
                  <button
                    onClick={() => {
                      {
                        isAuthenticated
                          ? dispatch(addToCart(item))
                          : alert("Login in your account");
                      }
                    }}
                    className="btn btn-success w-100"
                  >
                    Add To Cart
                  </button>
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
