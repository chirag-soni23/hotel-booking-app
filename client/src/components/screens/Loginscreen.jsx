import React, { useState } from "react";
import axios from "axios";
import Loader from "../Loader";
import Success from "../Success";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function Login() {
    setLoading(true);
    setError(false);

    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        user
      );
      const data = response.data;
      localStorage.setItem("currentUser", JSON.stringify(data));
      window.location.href = "/home";
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 bs">
          <h2>Login</h2>
          {error && (
            <div className="alert alert-danger">
              Invalid Credentials. Please check your email and password.
            </div>
          )}
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn mt-3" onClick={Login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;

