import React from "react";
import styles from "./BlueYellowCurve.module.css";

const HeaderCurves = () => {
  return (
    <div className={styles.curveHeader}>
      {/* Blue Curve */}
      <svg
        className={styles.blueCurve}
        viewBox="0 0 375 150"
        preserveAspectRatio="none"
      >
        <path d="M0,100 C100,150 275,0 375,75 L175,0 L0,100 Z" fill="#1e1b4b" />
      </svg>

      {/* Yellow Curve with Gradient */}
      <svg
        className={styles.yellowCurve}
        viewBox="0 0 375 150"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="yellowGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffcc00" />
            <stop offset="100%" stopColor="#ffa500" />
          </linearGradient>
        </defs>
        <path
          d="M0,110 C100,160 275,50 375,90 L375,0 L0,0 Z"
          fill="url(#yellowGradient)"
        />
      </svg>
    </div>
  );
};

export default HeaderCurves;
