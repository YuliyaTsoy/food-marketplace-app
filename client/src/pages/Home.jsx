import { useState, useEffect, useRef, useMemo } from 'react'

import Filter from '../components/Filter'
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_PRODUCTS, GET_PRODUCTS_FROM_SEARCH } from '../utils/queries';

// dummy imports
import { Tomato, Samosa, Potatoes, FishTacos, Brisket, Eggplant, Empanadas, Gouda } from '../assets/samplepics/index'


export default function Home() {

    //products to render will live in a state variable 
    const [productsToRender, setProducts] = useState([])

    //get all products from mutation GET_ALL_PRODUCTS
    const { loading, data } = useQuery(GET_ALL_PRODUCTS)
    const allProducts = data?.products || []
    console.log(allProducts)
    //use effect to set the products to render once data is defined
    useEffect(() => {
        setProducts(allProducts)
    }, [data])

    const getRefinedProducts = async (seachQuery) => {
        // will trigger to useQuery and re render the products found from the search
        console.log(`user wants to find products related to: ${seachQuery}`)
        // const { loading, data } = useQuery(GET_PRODUCTS_FROM_SEARCH)
        // const refinedProducts = data?.productSearch || []
        // setProducts(refinedProducts)
    }

    //if data is not defined, it will show a loading prompt
    if (loading) {
        return <h2>LOADING...</h2>
    }

    //when data is defined it will render all products in product cards
    return (
        <>
            <div className='flex justify-center md:mx-32 sm:mx-20'>
                <SearchBar />
            </div>
            <div className="home-page flex">
                <Filter />
                <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-8 my-8">
                    {productsToRender.map((product) => {
                        return (
                            <>
                                <ProductCard
                                    key={product._id}
                                    name={product.name}
                                    image={Samosa}
                                    // image={product.image}
                                    price={product.price}
                                    storeName={product.lister?.storeName}
                                />

                            </>
                        )
                    })}
                </div>
            </div>
        </>
    );
}