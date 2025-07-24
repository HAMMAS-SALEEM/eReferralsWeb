import React from 'react';

const GradientCircularProgress = ({ 
  size = 60, 
  thickness = 4, 
  variant = "blue" 
}) => {
  const radius = (size - thickness) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <div className="relative inline-flex">
      {/* Separate SVG for gradient definitions */}
      <svg width={0} height={0}>
        <defs>
          {/* Blue Gradient */}
          <linearGradient id="blue_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#153259" />
            <stop offset="100%" stopColor="#418FD1" />
          </linearGradient>
          
          {/* Green Gradient */}
          <linearGradient id="green_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2D6465" />
            <stop offset="50%" stopColor="#3A806B" />
            <stop offset="100%" stopColor="#67DE7F" />
          </linearGradient>
        </defs>
      </svg>

      {/* SVG for the spinning circle */}
      <svg width={size} height={size}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${variant === "green" ? "green_gradient" : "blue_gradient"})`}
          strokeWidth={thickness}
          strokeDasharray={`${circumference * 0.45}`}
          strokeLinecap="round"
          className="loading-spinner"
        />
      </svg>

      <style jsx>{`
        .loading-spinner {
          transform-origin: 50% 50%;
          animation: spinner-rotate 0.3s linear infinite;
        }

        @keyframes spinner-rotate {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default GradientCircularProgress;