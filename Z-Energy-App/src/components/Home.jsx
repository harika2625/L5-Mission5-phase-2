import React from "react";
import styles from "./Home.module.css";
import NavBar from "../common/NavBar";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.greetingContainer}>
        <div className={styles.statusIcons}>
          <p>9:41</p>
          <img src="/Cellular Connection.png" alt="Network Connection"></img>
          <img src="/Property 1=icon, Property 2=wifi.png" alt="Wifi"></img>
          <img src="/Battery.png" alt="Battery"></img>
        </div>
        <div className={styles.greeting}>
          <h2>Kia Ora Alex,</h2>
          <div>
            <h4>Sharetank</h4>
            <p>
              Maximize Your Fuel,
              <br />
              Amplify Your Sharing
            </p>
          </div>
          <button>View my tank</button>
        </div>
      </div>
      <div className={styles.fuelFoodContainer}>
        <div className={styles.leftContainer}>
          <img src="/Property 1=icon, Property 2=graph.png"></img>
          <p>Fuel Price Comparison</p>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.orderFoodContainer}>
            Order Food
            <img src="/Property 1=icon, Property 2=pie.png"></img>
          </div>
          <div className={styles.nearMeContainer}>
            Z<br />
            Near me
            <img src="/Property 1=icon, Property 2=find Z.png"></img>
          </div>
        </div>
      </div>
      <div className={styles.navBarContainer}>
        <img src="public/Property 1=icon, Property 2=HOME.png"></img>
        <img src="/Property 1=icon, Property 2=qr.png"></img>
        <img src="/Property 1=icon, Property 2=sharetank.png"></img>
        <img src="/Property 1=icon, Property 2=hamburger menu.png"></img>
      </div>
    </div>
  );
}
export default Home;
