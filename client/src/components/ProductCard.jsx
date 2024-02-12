import React, { useState, useEffect, useRef, useMemo } from "react";

const ProductCard= (props) => {
  const { image, title, price, description, store } = props;
  return (
    <>
     <div className="product-card lg:flex md:flex">
        <div className="product-image-container ml-20">
          <img className="product-picture-box" src={image} alt={title} />
	</div>
    </div>
    </>
  );
};
export default ProductCard;