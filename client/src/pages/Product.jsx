import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/SilngeProductCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../utils/queries";

function ProductPage() {
    let { productId } = useParams();
    //   console.log(productId);
    const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
    console.log(data);

    const product =
    data?.products.filter((product) => product._id === productId)[0] || {};
    console.log(product);
    return (
      <div>
        <ProductCard product={product} />
      </div>
    );
}

export default ProductPage;
