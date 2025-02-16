import { useNavigate } from "react-router-dom";
// import "./home.css"; // Import CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement, increament } from "./store";
function Home() {
  let veg = useSelector((state) => state.products.veg);
  let nonveg = useSelector((state) => state.products.nonveg);
  let milk = useSelector((state) => state.products.milk);

  let dispatch = useDispatch();
  let cartItems = useSelector((state) => state.cart);

  let allProducts = [...veg, ...nonveg, ...milk];
  let navigate = useNavigate();
  let [searchText, setSearchText] = useState("");
  let [filteredItems, setFilteredItems] = useState([]);

  let auth = useSelector((state) => state.auth);
  let isAuthenticated = auth.isAuthenticated;

  let handleSearch = () => {
    let filtered = allProducts.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="home-container">
      <h1 className="text-center">Welcome to PR Store</h1>
      <div className="search-container">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Enter the items to search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="btn btn-primary search-button"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>
      <br />
      <br />
      {searchText && filteredItems.length > 0 ? (
        <div className="search-results">
          <h2 className="text-center">Search Results</h2>
          <div className="items-grid">
            {filteredItems.map((item, index) => (
              <div key={index} className="item-card">
                <img src={item.image} alt={item.name} className="item-image" />
                <p style={{ textDecoration: "bold" }}>{item.name}</p>
                <p className="price">₹{item.price}</p>

                {/* modify the addtocart */}

                <div className=" items-container image-container p-0">
                  {cartItems.some((cartitem) => cartitem.name === item.name) ? (
                    <div className="cart-control ">
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
                      className="btn btn-success w-100 "
                      // style={{ width: "180px" }}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <p className="text-center">Click on any category to explore items</p>
          <div className="image-grid">
            <div className="image-card" onClick={() => navigate("/veg")}>
              <img src="veg.jpg" alt="Veg Items" />
              <h3>Veg Items</h3>
            </div>
            <div className="image-card" onClick={() => navigate("/nonveg")}>
              <img src="non-veg.jpg" alt="Non-Veg Items" />
              <h3>Non-Veg Items</h3>
            </div>
            <div className="image-card" onClick={() => navigate("/milk")}>
              <img src="milk.jpg" alt="Milk Items" />
              <h3>Milk Items</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
