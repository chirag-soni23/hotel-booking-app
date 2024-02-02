import React, { useState } from "react";
import axios from "axios";
import Loader from "../Loader";
import Error from "../Error";
import Success from "../Success";

function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/users/register",
          user
        );

        const data = response.data;
        setLoading(false);
        setSuccess(true);
        setName("");
        setEmail("");
        setPassword("");
        setCPassword("");
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert("Passwords don't match");
    }
  }

  return (
    <div className="container">
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 bs">
          <h2>Register</h2>
          {success && (
            <Success message="Registration Success ✅" />
          )}
          {error && <Error />}
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="password"
            className="form-control"
            placeholder="Enter Confirm Password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
          <button className="btn mt-3" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
