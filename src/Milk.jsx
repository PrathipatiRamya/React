import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";

function Milk() {
  let milk = useSelector((state) => state.products.milk);
  let dispatch = useDispatch();
  let allItems = milk.map((item, index) => (
    <div className="items-container image-container ">
      <div>
        <img src={item.image} width={150} height={150} />
        <div key={index} className="m-4 ">
          {item.name} - &#8377;{item.price} &emsp;
          <button
            onClick={() => dispatch(addToCart(item))}
            className="btn btn-success w-100 "
          >
            AddToCart
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="mt-4 ">
        <h1 className="text-center mb-4">Milk Items</h1>
        <div className="dis">{allItems}</div>
      </div>
    </>
  );
}

export default Milk;
