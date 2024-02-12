import React, { useState, useEffect, useRef, useMemo } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import ProductCard from "../components/SilngeProductCard.jsx";
// import { Carrots } from "../assets/samplepics/index.jsx";


// export default function Product(props) {
//   const [product, setProduct] = useState({});
   
//   return (
//     <>
//     <link rel="stylesheet" href="" />
//      </>
//   );
// }

function ProductPage () {
    let { productId } = useParams();
    return 
    <Routes>
      
            <Route path = "/Product/:productId" element = {<ProductCard/>} />
       
    </Routes>
}
export default ProductPage