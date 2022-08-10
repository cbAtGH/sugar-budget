import React from "react";
import chroma from "chroma-js";

const ProgressRing = ({ radius, stroke, progress }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashOffset = circumference - progress * circumference;
  const f = chroma.scale(["3D9179", "F3B82D", "F5533E"]);
  const strokeColor = f(progress).toString();
  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashOffset }}
        stroke-width={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default ProgressRing;
