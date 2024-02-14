import { useState, useEffect, useRef, useMemo } from 'react'

import Filter from '../components/Filter'
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_PRODUCTS, GET_CATEGORIES } from '../utils/queries';
import { REFINE_PRODUCTS } from '../utils/mutations';

// dummy imports
import { Tomato, Samosa, Potatoes, FishTacos, Brisket, Eggplant, Empanadas, Gouda } from '../assets/samplepics/index'


export default function Home() {

    //products to render will live in a state variable 
    const [productsToRender, setProducts] = useState([])
    const [allCategories, setCategories] = useState([])

    // get all products from mutation GET_ALL_PRODUCTS
    const { loading, data } = useQuery(GET_ALL_PRODUCTS)
    const allProducts = data?.products || []
    // console.log(allProducts)
    //use effect to set the products to render once data is defined
    useEffect(() => {
        setProducts(allProducts)
    }, [data])

    //get all categories using query GET_CATEGORIES
    const categoriesResult = useQuery(GET_CATEGORIES)
    const categoriesFromDB = categoriesResult.data?.categories || []
    useEffect(() => {
        setCategories(categoriesFromDB)
    }, [categoriesResult])
    // console.log('categories', allCategories)

    //use mutation to get products to render
    const [refineProducts, { data: refinedProductsData, error }] = useMutation(REFINE_PRODUCTS)

    //state for filters
    const [filterState, setFilterState] = useState({
        filterCount: 0,
        filters: {
            cannedGoods: false,
            dairy: false,
            fruits: false,
            meat: false,
            preparedGoods: false,
            vegetables: false,
        },
        priceRange: [0, Infinity]
    })

    //useEffect for filter tracking
    useEffect(() => {
        //watch filterState and refine products when filterstate changes
        console.log(filterState.filters)
        // build an array of strings with the applied filters'
        let catArr = [];

        // map through the object and add to array if the value is true
        for (const [key, value] of Object.entries(filterState.filters)) {
            value ? catArr.push(key) : ''
        }
        console.log("filters by category", catArr)

        // get products in the categories using mutation
        const filterByCat = refineProducts({
            variables: { searchCategories: ['65cbe7cbeb58abb5417133c3'] }
        })
        const filteredByCat = refinedProductsData?.productSearch || []
        console.log(filteredByCat)
        setProducts(filteredByCat)


    }, [filterState])

    //useMutation to refineProducts from search query

    const getRefinedProducts = async (seachQuery) => {
        // will trigger to refineproducts function from mutation and re render the products found from the search
        console.log(`user wants to find products related to: ${seachQuery}`)
        refineProducts({
            variables: { searchQuery: seachQuery, searchCategories: null }
        })
        const refinedProducts = refinedProductsData?.productSearch || []
        console.log('refined', refinedProductsData)
        setProducts(refinedProducts)
    }

    //if data is not defined, it will show a loading prompt
    if (loading) {
        return <h2>LOADING...</h2>
    }

    //when data is defined it will render all products in product cards
    return (
        <>
            <div className='flex justify-center md:mx-32 sm:mx-20'>
                <SearchBar onFormSubmit={getRefinedProducts} />
            </div>
            <div className="home-page flex">
                <Filter filterState={filterState} setFilterState={setFilterState} />
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