import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";
import PriceComparison from "./pages/PriceComparison/PriceComparison";
import TestMap from "./pages/Map/TempMap";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/pricecomparison" element={<PriceComparison />} />
        <Route path="/map" element={<TestMap />} />
      </Routes>
    </div>
  );
}

export default App;
