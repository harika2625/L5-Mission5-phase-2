import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", {
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "sucessfully logged in") {
          navigate("/home");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={styles.signUpContainer}>
      <div className={styles.blueContainer}>
        <div className={styles.statusIcons}>
          <p>9:41</p>
          <img src="./public/high-connection.png" alt="networkConnection"></img>
          <img src="./public/wifi.png" alt="Wifi"></img>
          <img src="./public/full-battery.png" alt="Battery"></img>
        </div>

        {/* <img src="../public/logo.png" alt="Z logo" /> */}
      </div>
      <div className={styles.yellowLine}></div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
            className="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="username"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.login}>
          <strong>Login</strong>
        </button>
      </form>
    </div>
  );
}
export default Login;
