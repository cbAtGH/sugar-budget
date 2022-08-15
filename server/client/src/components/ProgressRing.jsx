import React from "react";
import getChroma from "../utils/chromaColor";
import "../styles/ProgressRing.css";

const ProgressRing = (props) => {
  let {
    size = 150,
    progress = 0,
    trackWidth = 10,
    trackColor = `#ddd`,
    indicatorWidth = 10,
    labelColor = `#333`,
    total = 0,
  } = props;
  progress = progress > 1 ? 1 : progress;
  const center = size / 2;
  const radius =
    center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * ((1 - progress) / 1);
  const c = getChroma();
  const indicatorColor = c(progress?.toString());
  return (
    <div className="progress-container">
      <div className="progress-wrapper" style={{ width: size, height: size }}>
        <svg className="progress" style={{ width: size, height: size }}>
          <circle
            className="progress-track"
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <circle
            className="progress-indicator"
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="progress-label" style={{ color: labelColor }}>
          <span className="progress-label__progress">{`${total}g `}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressRing;
