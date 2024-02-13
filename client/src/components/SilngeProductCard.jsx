import React, { useState, useEffect, useRef, useMemo } from "react";

const ProductCard = (props) => {
  const { image, title, price, description, store } = props;
  console.log(props);

  return (
    <>
      <div className="product-card lg:flex md:flex">
        <div className="product-image-container ml-20">
          <img className="product-picture-box" src={props.product.image} alt={props.product.name} />
        </div>
        <div className="product-details ml-10 lg:flex-end m-6">
          <h1 className="text-xl px-5 py-2">{props.product.name}</h1>
          <p className="px-5 py-2">{props.product.price}</p>
          <p className="px-5 py-2">{props.product.description}</p>
          <p className="px-5 py-2 mb-3">{props.product.store}</p>
          <button className="bg-red-300 cursor-pointer hover:text-white rounded-full ml-10 mt-8 mb-3 px-5 py-2">
            Add to store
          </button>
        </div>
      </div>
    </>
  );
};
export default ProductCard;