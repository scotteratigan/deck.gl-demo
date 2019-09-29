import React from "react";
// import { css } from "@emotion/core"; // only used for overrides
import CircleLoader from "react-spinners/CircleLoader";
// documentation: https://www.npmjs.com/package/react-spinners
import "./Spinner.scss";

export default function Spinner({ active, size = 150 }) {
  return active ? (
    <div className="spinner-background">
      <CircleLoader
        loading={active}
        // css={override}
        // sizeUnit={"px"}
        size={size}
        // color={"#123abc"}
        // loading={true}
      />
    </div>
  ) : (
    <></>
  );
}
