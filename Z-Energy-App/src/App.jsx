import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Notification from "./components/Notification";
import Notification2 from "./components/Notification2";
import PaymentDetails from "./components/PaymentDetails";
import "./App.css";
import PriceComparison from "./pages/PriceComparison/PriceComparison";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Notification2" element={<Notification2 />} />
        <Route path="/PaymentDetails" element={<PaymentDetails />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/pricecomparison" element={<PriceComparison />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
