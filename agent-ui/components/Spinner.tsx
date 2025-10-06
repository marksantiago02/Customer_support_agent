import { useState, CSSProperties } from "react";
import { ScaleLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

interface SpinnerProps {
  loading: boolean;

  height: number;
  width: number;
  color?: string;
}

function Spinner({ loading, height, width, color = "#ffffff" }: SpinnerProps) {
  return (
    <div className="">
      <ScaleLoader
        color={color}
        loading={loading}
        cssOverride={override}
        height={height}
        width={width}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
