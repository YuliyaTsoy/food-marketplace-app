import React from "react";
// import { useParams } from "react-router-dom";
import ProductCard from "../components/SingleProductCard";
// import { useQuery } from "@apollo/client";
// import { GET_ONE_PRODUCT } from "../utils/queries";

function Orders() {
  // let { productId } = useParams();
  // //   console.log(productId);
  // const { loading, error, data } = useQuery(GET_ONE_PRODUCT, {
  //   variables: { id: productId },
  // });
  // console.log(data);

  // const product = data?.product || {};
  // console.log(product);
  return (
    <div>
      {/* <ProductCard productId={_id} /> */}
      <h1>Here will be order list</h1>
    </div>
  );
}

export default Orders;
