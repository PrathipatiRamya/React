import "bootstrap/dist/css/bootstrap.min.css";

function AboutUs() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-8 mx-auto text-center">
          <h1 className="mb-4 text-primary fw-bold">About Us</h1>
          <p className="lead">
            Welcome to <b>Our Store</b>, your number one source for the freshest
            and tastiest food items. We're dedicated to providing you the very
            best of products, with an emphasis on **quality, hygiene, and
            customer satisfaction**.
          </p>
          <p>
            Our Store has come a long way from its beginnings. We strive to
            serve our customers with the best products and ensure they have a
            delightful experience every time they shop with us.
          </p>
          <h3 className="mt-4 text-primary">Our Mission</h3>
          <p>
            Our mission is to provide fresh, high-quality food items at
            affordable prices while ensuring the best shopping experience for
            our customers.
          </p>
          <h3 className="mt-4 text-primary">Why Choose Us?</h3>
          <ul className="list-group list-group-flush text-start mx-auto w-75">
            <li className="list-group-item">✔ 100% Fresh & Quality Products</li>
            <li className="list-group-item">
              ✔ Trusted by Thousands of Customers
            </li>
            <li className="list-group-item">✔ Best Prices & Great Discounts</li>
            <li className="list-group-item">✔ Fast & Reliable Delivery</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
