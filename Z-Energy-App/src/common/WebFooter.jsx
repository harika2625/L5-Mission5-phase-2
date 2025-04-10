import React from "react";
import styles from "./WebFooter.module.css";

export default function WebFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contactUs}>
        <button className={styles.contactUsBtn}>
          Contact Us <span>V</span>
        </button>
      </div>
      <div className={styles.footerContent}>
        <div className={`${styles.footerLogoContainer} ${styles.footerLinks}`}>
          <img
            className={styles.footerLogo}
            src="\pngwing.com.png"
            alt="logo"
          />
        </div>

        <div className={styles.footerLinks}>
          <h4 className={styles.footerTitle}>Products and services</h4>
          <ul>
            <li>At the station</li>
            <li>Z app</li>
            <li>Rewards and promotions</li>
          </ul>
        </div>
        <div className={styles.footerLinks}>
          <h4 className={styles.footerTitle}>For businesses</h4>
          <ul>
            <li>Z Business fuel card</li>
            <li>Fuels and services</li>
            <li>Business tips and stories</li>
          </ul>
        </div>
        <div className={styles.footerLinks}>
          <h4 className={styles.footerTitle}>About Z</h4>
          <ul>
            <li>Out Story</li>
            <li>Our People</li>
            <li>What we stand for</li>
            <li>Sustainability</li>
            <li>News</li>
            <li>Careers at Z</li>
            <li>Corporate Centre</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
