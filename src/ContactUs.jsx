import "bootstrap/dist/css/bootstrap.min.css";

function ContactUs() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-8 mx-auto text-center">
          <h1 className="mb-4 text-primary fw-bold">Contact Us</h1>
          <p className="lead">
            Have questions or need assistance? Feel free to reach out to us. Our
            team is here to help!
          </p>
        </div>
      </div>

      <div className="row w-100 d-flex justify-content-center">
        {/* Contact Form
        <div className="col-lg-6">
          <div className="card shadow p-4">
            <h3 className="text-primary mb-3">Get in Touch</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </div>
        </div> */}

        {/* Contact Info */}
        <div className="col-lg-7">
          <div className="card shadow p-4">
            <h3 className="text-primary">Contact Information</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                📍 Address: 123 Food Street, Hyderabad, India
              </li>
              <li className="list-group-item">📞 Phone: +91 98765 43210</li>
              <li className="list-group-item">
                📧 Email: support@ourstore.com
              </li>
              <li className="list-group-item">
                🕒 Working Hours: Mon - Sat (9 AM - 9 PM)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
