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
        <div className="product-details ml-10">
          <h1 className="text-xl px-5 py-2">Carrots</h1>
          <p className="px-5 py-2">Price: ${price}</p>
          <p className=" px-5 py-2">
            Description: Lorem ipsum, dolor sit amet consectetur adipisicing
            elit.
          </p>
         
        </div>
      </div>
    </>
  );
}
