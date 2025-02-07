import { configureStore, createSlice } from "@reduxjs/toolkit";

//create Products slice(to group the specific functionality of related state and reducers(actions))
const productsSlice = createSlice({
  name: "products",
  initialState: {
    veg: [
      { name: "Potato", price: 34, image: "./potato.jpeg" },
      { name: "Tomato", price: 15, image: "./tomato.jpeg" },
      { name: "Green Chilli", price: 30, image: "./green_chilli.jpeg" },
      { name: "Carrot", price: 50, image: "./carrot.jpeg" },
      { name: "Onion", price: 60, image: "./onion.jpeg" },
      { name: "Beans", price: 50, image: "./beans.jpeg" },
      { name: "Lady's finger", price: 30, image: "./ladys_finger.jpeg" },
      { name: "Bottle Gourd", price: 15, image: "./bootle_gourd.jpeg" },
      { name: "Beetroot", price: 60, image: "./beetroot.jpeg" },
      { name: "Brinjal", price: 25, image: "./brinjal.jpeg" },
      { name: "Bitter Gourd", price: 34, image: "./bitter_gourd.jpeg" },
      { name: "Little Finger", price: 23, image: "./dondakaya.jpeg" },
      { name: "Cabbage", price: 30, image: "./cabbage.jpeg" },
      { name: "Cauli Flower", price: 43, image: "./cauliflower.jpeg" },
      { name: "Raddish", price: 50, image: "./raddish.jpeg" },
      { name: "Capsicum", price: 67, image: "./green_capsicum.jpeg" },
      { name: "Red Bell Pepper", price: 25, image: "./red_bell_pepper.jpeg" },
      { name: "Yellow Bell Peper", price: 23, image: "./yellow_pepper.jpeg" },
      { name: "Cucumber", price: 30, image: "./cucumber.jpeg" },
      { name: "Kandha", price: 23, image: "./kandha.jpeg" },
      { name: "Chikudu ", price: 23, image: "./chikudu.jpeg" },
    ],
    nonveg: [
      { name: "Chicken", price: 240, image: "./chicken.jpg" },
      { name: "Fish", price: 450, image: "./fish.jpeg" },
      { name: "Mutton", price: 890, image: "./mutton.jpeg" },
      { name: "Prawns", price: 500, image: "./prawans.jpg" },
      { name: "Skin Less Chicken", price: 220, image: "./skinlesschicken.jpg" },
    ],
    milk: [
      { name: "Jersey", price: 32, image: "./jersey.jpeg" },
      { name: "Heritage", price: 31, image: "./heritage.jpeg" },
      { name: "Sagam", price: 34, image: "./samgam.jpeg" },
    ],
  },
  reducers: {},
});

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      let item = state.find((item) => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    increament: (state, action) => {
      let item = state.find((item) => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      }
    },
    decrement: (state, action) => {
      let item = state.find((item) => item.name === action.payload.name);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        return state.filter((item) => item.name !== action.payload.name);
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.name !== action.payload.name);
    },
    clearCart: () => [],
  },
});

let purchaseDetails = createSlice({
  name: "purchase",
  initialState: [],
  reducers: {
    purchaseList: (state, action) => {
      state.push({ ...action.payload });
    },
  },
});

//for authenticationpurpose create slice
let authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("username") ? true : false,
    user: localStorage.getItem("username") || "", //get the stored name
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("username", action.payload); //store in local store
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = "";
      localStorage.removeItem("username"); //clear from localstorage
    },
  },
});

//configure store
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    purchase: purchaseDetails.reducer,
    auth: authSlice.reducer,
  },
});

//export the cart reducers as actions addToCart

export const { addToCart, increament, decrement, removeFromCart, clearCart } =
  cartSlice.actions;

export const { purchaseList } = purchaseDetails.actions;

export const { login, logout } = authSlice.actions;
//export store
export default store;
