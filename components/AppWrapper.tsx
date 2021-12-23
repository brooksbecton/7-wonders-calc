import * as React from "react";
import styles from "./AppWrapper.module.css";

export const AppWrapper: React.FunctionComponent = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
      }}
    >
      
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default AppWrapper;
