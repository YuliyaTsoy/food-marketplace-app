import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";

import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../utils/queries";
import { REFINE_PRODUCTS } from "../utils/mutations";

// dummy imports
import {
  Tomato,
  Samosa,
  Potatoes,
  FishTacos,
  Brisket,
  Eggplant,
  Empanadas,
  Gouda,
} from "../assets/samplepics/index";

export default function Home() {
  //products to render will live in a state variable
  const [productsToRender, setProducts] = useState([]);

  //get all products from mutation GET_ALL_PRODUCTS
  const { loading, data } = useQuery(GET_ALL_PRODUCTS);
  const allProducts = data?.products || [];
  // console.log(allProducts)
  //use effect to set the products to render once data is defined
  useEffect(() => {
    setProducts(allProducts);
  }, [data]);

  //useMutation to refineProducts from search query
  const [refineProducts, { error }] = useMutation(REFINE_PRODUCTS);

  const getRefinedProducts = async (seachQuery) => {
    // will trigger to refineproducts function from mutation and re render the products found from the search
    console.log(`user wants to find products related to: ${seachQuery}`);
    const { loading, data } = await refineProducts({
      variables: { searchQuery: seachQuery },
    });
    const refinedProducts = data?.productSearch || [];
    // console.log(refinedProducts)
    setProducts(refinedProducts);
  };

  const filterByCategory = async (filterBy) => {
    // build an array of strings with the applied filters'
    let catArr = [];

    // map through the object and add to array if the value is true
    for (const [key, value] of Object.entries(filterBy)) {
      value ? catArr.push(key) : "";
    }
    console.log(catArr);
  };

  //if data is not defined, it will show a loading prompt
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  //when data is defined it will render all products in product cards
  return (
    <>
      <div className="flex justify-center md:mx-32 sm:mx-20">
        <SearchBar onFormSubmit={getRefinedProducts} />
      </div>
      <div className="home-page flex">
        <Filter onFilterClick={filterByCategory} />
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-8 my-8">
          {productsToRender.map((product) => {
            {
              console.log("product image -> ", product.image);
            }
            return (
              <>
                <Link to={`/Product/${product._id}`}>
                  <ProductCard
                    key={product._id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    storeName={product.lister?.storeName}
                  />
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
