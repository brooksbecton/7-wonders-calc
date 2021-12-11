import * as React from "react";
import Image from "next/image";
import styles from "./AppWrapper.module.css";

// eslint-disable-next-line react/prop-types
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
