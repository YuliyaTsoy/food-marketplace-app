import React, { useState, useEffect, useRef, useMemo } from "react";
import { Carrots } from "../assets/samplepics/index.jsx";

const colorPalette = {
  background: "bg-red-200",
  text: "text-black-300",
  hoverBg: "bg-red-300",
  currentBg: "bg-red-800",
};

export default function Product() {
  const [price, setPrice] = useState();

  return (
    <>
      <div className="product-page">
        <div className="product-image-container mx-20">
          <img className="object-cover" src={Carrots} />
        </div>
       
      </div>
    </>
  );
}
