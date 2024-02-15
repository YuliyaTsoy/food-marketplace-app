import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/SingleProductCard";
import { useQuery } from "@apollo/client";
import { GET_ONE_PRODUCT } from "../utils/queries";

function ProductPage() {
  let { productId } = useParams();
  //   console.log(productId);
  const { loading, error, data } = useQuery(GET_ONE_PRODUCT, {
    variables: { id: productId },
  });

  const product = data?.product || {};
  return (
    <div>
      <ProductCard product={product} />
    </div>
  );
}

export default ProductPage;
