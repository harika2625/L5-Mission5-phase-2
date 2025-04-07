import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", {
        name,
        email,
        password,
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  return (
    <div className={styles.signUpContainer}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="email">
            <strong>Name:</strong>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            autoComplete="off"
            className="username"
            name="email"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">
            <strong>Email:</strong>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            className="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.inputContainer}>
            <label htmlFor="email">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="username"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="register">
          Register
        </button>
      </form>
      <p>Already have an Account</p>
      <Link to="/Login" type="submit" className="login">
        Login
      </Link>
    </div>
  );
}
export default Signup;
