import { useState, useEffect, useRef, useMemo } from 'react'

import Filter from '../components/Filter'
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_PRODUCTS } from '../utils/queries';

// dummy imports
import { Tomato, Samosa, Potatoes, FishTacos, Brisket, Eggplant, Empanadas, Gouda } from '../assets/samplepics/index'


export default function Home() {
    //get all products from mutation GET_ALL_PRODUCTS
    const { loading, data } = useQuery(GET_ALL_PRODUCTS)
    const allProducts = data?.products || []
    console.log(allProducts)

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
                    {allProducts.map((product) => {
                        return (
                            <>
                                <ProductCard
                                    key={product._id}
                                    name={product.name}
                                    image={product.image}
                                    price={product.price}
                                    // storeName={product.lister.storeName}
                                />

                            </>
                        )
                    })}
                    {/* <ProductCard name="tomato" image={Tomato} price={432.891} storeName={"Luc's store"} />
                    <ProductCard name="samosa" image={Samosa} price={12.32} storeName={"A store with way way too long of a name"} />
                    <ProductCard name="potato" image={Potatoes} price={6.99} storeName={"my potato store"} />
                    <ProductCard name="fish taco" image={FishTacos} price={17.52} storeName={"Luc's famous tacos"} />
                    <ProductCard name="brisket" image={Brisket} price={32.90} storeName={"arbees"} />
                    <ProductCard name="eggplant" image={Eggplant} price={9} storeName={"Luc's roof top garden"} />
                    <ProductCard name="empanadas" image={Empanadas} price={13.41} storeName={"my abuelita"} />
                    <ProductCard name="gouda" image={Gouda} price={22.22} storeName="some good gouda" /> */}
                </div>
            </div>
        </>
    );
}