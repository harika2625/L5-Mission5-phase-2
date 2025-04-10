import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlueYellowCurve from "../common/BlueYellowCurve"; // Import your
import Button from "@mui/material/Button";
import "../common/BlueYellowCurve.module.css"; // Import your CSS file for styling

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", {
        name,
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/Login");
        alert("Registered Successfully");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={styles.signUpContainer}>
      <div className={styles.blueContainer}>
        <div className={styles.statusBar}>
          <h4>9:41</h4>
          <div className={styles.statusIcons}>
            <img
              src="./public/high-connection.png"
              alt="networkConnection"
            ></img>
            <img src="./public/wifi.png" alt="Wifi"></img>
            <img src="./public/full-battery.png" alt="Battery"></img>
          </div>
        </div>
        {/* <img src="../public/logo.png" alt="Z logo" /> */}
      </div>
      <BlueYellowCurve />
      {/* <div className={styles.yellowLine}></div> */}
      <h3>Create an Account</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="email">
            <strong>Name</strong> <br />
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            className="username"
            name="email"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">
            <strong>E-mail</strong> <br />
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
            <br />
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="username"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button variant="outlined " type="submit" className={styles.signup}>
          Sign up
        </button>
      </form>
      <p>Already have an Account</p>

      <Link to="/Login" type="submit" className={styles.login}>
        Login
      </Link>
    </div>
  );
}
export default Signup;
