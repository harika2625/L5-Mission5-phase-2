import React from "react";
import styles from "./PriceComparison.module.css";
import { useState, useEffect } from "react";

export default function PriceComparison() {
  const [leftstations, setLeftStations] = useState([]);
  const [rightstations, setRightStations] = useState([]);
  const [leftAddress, setLeftAddress] = useState("");
  const [rightAddress, setRightAddress] = useState("");

  const Z91 = "/Property 1=91 sharetank, Property 2=clicked.png";
  const Z95 = "/Property 1=95 sharetank, Property 2=clicked.png";
  const ZDiesel = "/Property 1=ZD sharetank, Property 2=clicked.png";

  useEffect(() => {
    fetch("http://localhost:3000/stations")
      .then((response) => response.json())
      .then((data) => {
        setLeftStations(data.response);
        setRightStations(data.response);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <button className={styles.homeBtn}>
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.111 17.5002C4.12933 17.5002 3.3335 16.6836 3.3335 15.6752V8.34023C3.3335 7.78606 3.57933 7.26106 4.00016 6.91523L8.88933 2.90023C9.20171 2.64155 9.59458 2.5 10.0002 2.5C10.4057 2.5 10.7986 2.64155 11.111 2.90023L15.9993 6.91523C16.421 7.26106 16.6668 7.78606 16.6668 8.34023V15.6752C16.6668 16.6836 15.871 17.5002 14.8893 17.5002H5.111Z"
                fill="url(#paint0_linear_1_1127)"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.91699 17.5V12.9167C7.91699 12.4746 8.09259 12.0507 8.40515 11.7382C8.71771 11.4256 9.14163 11.25 9.58366 11.25H10.417C10.859 11.25 11.2829 11.4256 11.5955 11.7382C11.9081 12.0507 12.0837 12.4746 12.0837 12.9167V17.5"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_1127"
                  x1="20.1483"
                  y1="10.0677"
                  x2="3.3335"
                  y2="10.0677"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop
                    offset="0.317457"
                    stop-color="#3129AB"
                    stop-opacity="0.782912"
                  />
                  <stop offset="0.897669" stop-color="#1E196B" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </button>
        <h2>Price Comparison</h2>
      </div>
      <div className={styles.priceComparisonContainer}>
        <section className={styles.left}>
          <input className={styles.leftAddress} placeholder="Enter Address" />
          {leftstations.map((station) => (
            <div key={station._id} className={styles.stationCard}>
              <img
                src={"/pngwing.com.png"}
                alt="Station"
                className={styles.stationImage}
              />
              <h3>{station.name}</h3>
              <p className={styles.address}>{station.address}</p>
              <p
                className={
                  station.fuel_type === "91"
                    ? styles.fuelPrice91
                    : station.fuel_type === "95"
                    ? styles.fuelPrice95
                    : styles.fuelPriceDiesel
                }
              >{`$${station.fuel_price} per liter`}</p>
              <img
                src={
                  station.fuel_type === "91"
                    ? Z91
                    : station.fuel_type === "95"
                    ? Z95
                    : ZDiesel
                }
                alt="Z 95"
              />
              <button className={styles.topUpBtn}>Top up</button>
            </div>
          ))}
        </section>
        <section className={styles.right}>
          <input className={styles.rightAddress} placeholder="Enter Address" />
          {rightstations.map((station) => (
            <div key={station._id} className={styles.stationCard}>
              <img
                src={"/pngwing.com.png"}
                alt="Station"
                className={styles.stationImage}
              />
              <h3>{station.name}</h3>
              <p className={styles.address}>{station.address}</p>
              <p
                className={
                  station.fuel_type === "91"
                    ? styles.fuelPrice91
                    : station.fuel_type === "95"
                    ? styles.fuelPrice95
                    : styles.fuelPriceDiesel
                }
              >{`$${station.fuel_price} per liter`}</p>
              <img
                src={
                  station.fuel_type === "91"
                    ? Z91
                    : station.fuel_type === "95"
                    ? Z95
                    : ZDiesel
                }
                alt="Z 95"
              />
              <button className={styles.topUpBtn}>Top up</button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
