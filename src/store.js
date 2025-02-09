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
      { name: "Leg pieces", price: 160, image: "./leg_piece.jpeg" },
      { name: "Crab", price: 420, image: "./crab.jpeg" },
      { name: "Salmon", price: 790, image: "./salmon.jpeg" },
      { name: "Trout", price: 450, image: "./trout.jpeg" },
      { name: "Sardines", price: 550, image: "./sardiness.jpeg" },
      { name: "Cod", price: 460, image: "./cod.jpeg" },
      { name: "Shellfish", price: 450, image: "./shellfish.jpeg" },
      { name: "Tuna", price: 600, image: "./tuna.jpeg" },
      { name: "White Fish", price: 760, image: "./whitefish.jpeg" },
      { name: "Chicken Breast", price: 260, image: "./chicken_breast.jpeg" },
      {
        name: "Chicken Lollipop",
        price: 360,
        image: "./chicken_lollipop.jpeg",
      },
      {
        name: "Chicken Drumstick",
        price: 340,
        image: "./chicken_drumstick.jpeg",
      },
      { name: "Tiger Prawns", price: 650, image: "./tiger_prawans.jpeg" },
      { name: "Pink Shrimp", price: 750, image: "./pink_shirmp.jpeg" },
      {
        name: "Black Tiger Prawn",
        price: 560,
        image: "./black_tiger_prawans.jpeg",
      },
    ],
    milk: [
      { name: "Jersey Toned Milk", price: 32, image: "./jersey.jpeg" },
      { name: "Heritage Special", price: 28, image: "./heritage.jpeg" },
      { name: "Sagam Milk", price: 29, image: "./samgam.jpeg" },
      { name: "Amul Gold Milk", price: 38, image: "./amul_gold.jpeg" },
      {
        name: "Arokya Full Cream Milk",
        price: 42,
        image: "./arokya_full_cream.jpeg",
      },
      {
        name: "Country Delight Cow Milk",
        price: 45,
        image: "./country_delight_cow_milk.jpeg",
      },
      { name: "Dodle Curd", price: 45, image: "./dodla_curd.jpeg" },
      { name: "Heritage Curd", price: 50, image: "./heritage_curd.jpeg" },
      {
        name: "Heritage Double Tone Milk",
        price: 43,
        image: "./heritage_double_toned.jpeg",
      },
      {
        name: "Vijaya Toned Milk",
        price: 29,
        image: "./vijaya_toned_milk.jpeg",
      },
      {
        name: "Heritage Gold Cow Milk",
        price: 49,
        image: "./heritage_golden_cow.jpeg",
      },
      { name: "Milma Milk", price: 39, image: "./milma.jpeg" },
      { name: "Nanjil Milk", price: 41, image: "./nanjil.jpeg" },
      { name: "Wellness Slim", price: 38, image: "./wellness_slim.jpeg" },
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
