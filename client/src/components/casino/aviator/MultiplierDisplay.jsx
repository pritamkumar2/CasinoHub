import React, { useEffect, useState } from "react";
import planeImage from "../aviator/image/aviator/rocket.png"; // Path to your custom plane/rocket image

const MultiplierDisplay = ({ multiplier }) => {
  const [planePosition, setPlanePosition] = useState(0);
  
  // Update the plane's position based on the multiplier
  useEffect(() => {
    setPlanePosition(multiplier * 10); // Adjust the multiplier as needed for your animation scale
  }, [multiplier]);

  return (
    <div
      className="relative bg-black p-12 rounded-xl mr-5 mb-4 overflow-hidden"
      style={{ backgroundImage: "radial-gradient(circle at center, black, #1a1a1a)" }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-6xl z-10">
        x{multiplier.toFixed(2)} {/* Display multiplier prominently */}
      </div>
      <div
        className="absolute"
        style={{
          transform: `translateX(${planePosition}px)`,
          transition: "transform 0.1s linear", // Smooth animation
          bottom: '10%', // Adjust the vertical position as needed
          left: '0%', // Start position
        }}
      >
        <img src={planeImage} alt="Plane" style={{ width: "50px", height: "50px" }} />
      </div>
    </div>
  );
};

export default MultiplierDisplay;
