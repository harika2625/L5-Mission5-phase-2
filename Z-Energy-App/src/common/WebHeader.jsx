import React from "react";
import styles from "./WebHeader.module.css";

export default function WebHeader() {
  return (
    <div className={styles.navHeader}>
      <div className={styles.headerLeft}>
        <img className={styles.logo} src="\pngwing.com.png" alt="logo" />
        <p className={styles.personal}>For Personal</p>
      </div>
      <nav>
        <ul className={styles.navBar}>
          <li className={styles.navBarItem}>Z app</li>
          <li className={styles.navBarItem}>About Z</li>
          <li className={styles.navBarItem}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 3.75H18.75L16.875 11.875H5.625M16.875 14.375H6.25L3.125 1.25H1.25"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.625 18.125C16.3154 18.125 16.875 17.5654 16.875 16.875C16.875 16.1846 16.3154 15.625 15.625 15.625C14.9346 15.625 14.375 16.1846 14.375 16.875C14.375 17.5654 14.9346 18.125 15.625 18.125Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 18.125C8.19036 18.125 8.75 17.5654 8.75 16.875C8.75 16.1846 8.19036 15.625 7.5 15.625C6.80964 15.625 6.25 16.1846 6.25 16.875C6.25 17.5654 6.80964 18.125 7.5 18.125Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </li>
          <li className={styles.navBarItem}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9878 12.8721C10.8646 13.7695 9.44037 14.2028 8.00768 14.083C6.57499 13.9631 5.24257 13.2992 4.28407 12.2277C3.32557 11.1561 2.81375 9.75822 2.85374 8.32109C2.89373 6.88395 3.48249 5.51667 4.49909 4.50007C5.51569 3.48346 6.88297 2.89471 8.32011 2.85472C9.75725 2.81473 11.1551 3.32654 12.2267 4.28504C13.2983 5.24354 13.9621 6.57597 14.082 8.00866C14.2018 9.44135 13.7685 10.8656 12.8711 11.9888L17.1678 16.2846C17.2292 16.3418 17.2784 16.4108 17.3126 16.4875C17.3468 16.5641 17.3651 16.6469 17.3666 16.7308C17.3681 16.8147 17.3526 16.8981 17.3212 16.9759C17.2898 17.0537 17.243 17.1244 17.1836 17.1838C17.1243 17.2431 17.0536 17.2899 16.9758 17.3214C16.898 17.3528 16.8146 17.3682 16.7307 17.3667C16.6468 17.3653 16.564 17.3469 16.4873 17.3127C16.4107 17.2786 16.3417 17.2293 16.2844 17.1679L11.9878 12.8721ZM5.38278 11.5704C4.77114 10.9587 4.35457 10.1794 4.1857 9.33106C4.01684 8.48268 4.10325 7.60328 4.43404 6.804C4.76482 6.00472 5.32512 5.32144 6.04412 4.8405C6.76312 4.35957 7.60856 4.10257 8.47358 4.10199C9.33861 4.10141 10.1844 4.35727 10.904 4.83723C11.6237 5.3172 12.1849 5.99973 12.5168 6.79856C12.8486 7.5974 12.9362 8.47668 12.7685 9.32529C12.6008 10.1739 12.1853 10.9537 11.5744 11.5663L11.5703 11.5704L11.5661 11.5738C10.7454 12.3926 9.63313 12.8522 8.47375 12.8516C7.31437 12.8509 6.20265 12.3902 5.38278 11.5704Z"
                fill="black"
              />
            </svg>
          </li>
          <li className={styles.login}>
            Login{" "}
            <img className={styles.loginIcon} src="\Vector.png" alt="login" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
