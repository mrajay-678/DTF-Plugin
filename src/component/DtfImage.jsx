"use client"

import React, { useState } from "react";

const DtfImage = () => {
  const images = [
    "https://picsum.photos/id/1018/600/600",
    "https://picsum.photos/id/1015/600/600",
    "https://picsum.photos/id/1025/600/600",
    "https://picsum.photos/id/1033/600/600",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-xl mx-auto sticky top-10">
      {/* Main Image */}
      <div className="w-11/12 mx-auto aspect-square border rounded-2xl overflow-hidden mb-4">
        <img
          src={images[activeIndex]}
          alt={`Main ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 justify-center">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${
              activeIndex === idx
                ? "border-blue-500 scale-105"
                : "border-transparent"
            } transition-transform duration-200`}
          >
            <img
              src={img}
              alt={`Thumb ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default DtfImage;