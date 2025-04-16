import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Loading.module.css";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Notification"); // after delay, go to notification
    }, 2500); // 2.5 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.statusIcons}>
        <p>9:41</p>
        <img src="/high-connection.png" alt="networkConnection" />
        <img src="/wifi.png" alt="Wifi" />
        <img src="/full-battery.png" alt="Battery" />
      </div>
      <div className={styles.logoWrapper}>
        <img src="/default.png" alt="Circle Loader" className={styles.circle} />
        <img src="/logo.png" alt="Z Logo" className={styles.logo} />
      </div>
    </div>
  );
}

export default Loading;
