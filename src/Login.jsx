import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  let username = useRef(null);
  let password = useRef(null);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let loginCheck = () => {
    if (
      username.current.value === "Ramya" &&
      password.current.value === "Ramya@123"
    ) {
      dispatch(login(username.current.value));
      navigate("/home");
    } else {
      alert("Your credentials are wrong,check once!");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="card shadow-lg p-4" style={{ width: "350px" }}>
          <h1 className="text-center mb-4">Login Page</h1>
          <div className="mb-3">
            <label className="form-label">Username: </label>
            <input
              type="text"
              ref={username}
              className="form-control"
              placeholder="Ramya"
            />
          </div>

          <label className="form-label">Password: </label>
          <input
            type="password"
            ref={password}
            className="form-control"
            placeholder="Ramya@123"
          />
          <br />
          <br />
          <button
            type="submit"
            onClick={loginCheck}
            className="btn btn-primary w-100"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
export default Login;
