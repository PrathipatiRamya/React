import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Orders() {
  let orders = useSelector((state) => state.purchase);
  let navigate = useNavigate();

  return (
    <div className="orders-container">
      {orders.length > 0 ? (
        <>
          <div className="orders-header">
            <h2>Your Purchase History</h2>
          </div>

          <div className="orders-list">
            {orders.map((order, index) => (
              <div key={index} className="order-card">
                <div className="order-details">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h5>Order Details</h5>
                    <p className="order-date">
                      <strong>Date:</strong> {order.date}
                    </p>
                    <p className="order-time">
                      <strong>Time:</strong> {order.time}
                    </p>
                    <p className="final-price">
                      <strong>Total:</strong> &#8377;{order.finalPrice}
                    </p>
                  </div>
                  <h6>Items Ordered:</h6>
                  <ul className="order-items-list">
                    {order.items.map((product, i) => (
                      <li key={i} className="order-item">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="order-item-image"
                        />
                        <div className="order-item-info">
                          <strong>{product.name}</strong>
                          <p>
                            &#8377;{product.price} | Quantity:{" "}
                            {product.quantity}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-orders">
          <p>No orders placed yet.</p>
          <button onClick={() => navigate("/home")} className="browse-button">
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;

// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function Orders() {
//   let orders = useSelector((state) => state.purchase);
//   let navigate = useNavigate();

//   return (
//     <div className="container mt-4">
//       {orders.length > 0 ? (
//         <>
//           <h2 className="text-center text-primary mb-4 pt-100">
//             Your Purchase History
//           </h2>
//           <div className="row">
//             {orders.map((order, index) => (
//               <div key={index} className="row-md-6">
//                 <div className="card mb-4 shadow-sm">
//                   <div className="card-body">
//                     <h5 className="card-title text-danger">Order Details</h5>
//                     <p className="text-muted">
//                       <strong>Date & Time:</strong> {order.date}
//                     </p>
//                     <p className="text-success">
//                       <strong>Final Price:</strong> &#8377;{order.finalPrice}
//                     </p>
//                     <h6 className="mt-3">Order Items:</h6>
//                     <ul className="list-group">
//                       {order.items.map((product, i) => (
//                         <li
//                           key={i}
//                           className="list-group-item d-flex justify-content-between"
//                         >
//                           <span>{product.name}</span>
//                           <span>
//                             &#8377;{product.price} x {product.quantity}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div style={{ paddingLeft: "650px" }}>
//           <p className="text-muted ">
//             <span style={{ color: "maroon" }}>No orders placed yet.</span>
//           </p>
//           <button
//             onClick={() => navigate("/home")}
//             style={{ backgroundColor: "green", borderRadius: "5px" }}
//           >
//             Browse Products
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Orders;
