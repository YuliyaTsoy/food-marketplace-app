import React, { useState, useEffect, useRef, useMemo } from "react";
import { ADD_ORDER } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const ProductCard = (props) => {
  const { _id, image, title, price, description, store } = props;
  console.log(props);

  //state variable for button click
  const [buttonClick, setButton] = useState(false);

  const [product, { error }] = useMutation(ADD_ORDER);
  const addToOrder = async (_id) => {
    try {
      const { data } = await product({
        variables: {
          productId: _id,
        },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className="product-card lg:flex md:flex">
        <div className="product-image-container ml-20">
          <img
            className="product-picture-box"
            src={props.product.image}
            alt={props.product.name}
          />
        </div>
        <div className="product-details ml-10 lg:flex-end m-6">
          <h1 className="text-xl px-5 py-2">{props.product.name}</h1>
          <p className="px-5 py-2">{props.product.price}</p>
          <p className="px-5 py-2">{props.product.description}</p>
          <p className="px-5 py-2 mb-3">{props.product.store}</p>
          <button
            className={`cursor-pointer   rounded-full mx-10 mt-8 mb-3 px-5 py-2 ${buttonClick? "bg-red-100" : "bg-red-300 hover:bg-red-800 hover:text-white" }`}
            onClick={() => {
              //can only run if button is false
              if (!buttonClick) {
                addToOrder(props.product._id);
                setButton(true);
              }
            }}
            disabled={buttonClick}
          >
            {buttonClick ? "Saved" : "Add to Order"}
          </button>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
