import React from "react";
import styles from "./Skeleton.module.css";

const Skeleton = ({ count = 10 }) => {
  return (
    <div className={styles["skeleton-grid"]}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles["skeleton-card"]}>
          <div className={styles["skeleton-image"]}></div>
          <div className={styles["skeleton-text"]}></div>
          <div className={styles["skeleton-text short"]}></div>
          <div className={styles["skeleton-price"]}></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
