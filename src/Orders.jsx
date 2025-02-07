import { useSelector } from "react-redux";

function Orders() {
  let orders = useSelector((state) => state.purchase);
  let allOrders = orders.map((item, index) => (
    <div key={index}>
      <p style={{ color: "orangered" }}>Date of Place Order: {item.date}</p>
      <p style={{ color: "greenyellow" }}>
        Final Price: &#8377;{item.finalPrice}
      </p>
      <p>Order Items: </p>
      <ul>
        {item.items.map((product) => (
          <li>
            {product.name} - &#8377;{product.price} * {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  ));

  return (
    <>
      {orders.length > 0 ? (
        <div>
          <h1>Your Purchase History</h1>
          {allOrders}
        </div>
      ) : (
        <p>Orders are empty</p>
      )}
    </>
  );
}
export default Orders;
