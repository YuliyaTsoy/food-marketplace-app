import { useState, useEffect, useRef, useMemo } from 'react'

import Filter from '../components/Filter'
import ProductCard from '../components/ProductCard';

// dummy imports
import {Tomato, Samosa, Potatoes, FishTacos, Brisket, Eggplant, Empanadas, Gouda} from '../assets/samplepics/index'

export default function Home() {
    return (
        <div className="home-page flex">
            <Filter/>
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                <ProductCard name="tomato" image={Tomato} price={432.891} storeName={"Luc's store"} />
                <ProductCard name="samosa" image={Samosa} price={12.32} storeName={"A store with way way too long of a name"} />
                <ProductCard name="potato" image={Potatoes} price={6.99} storeName={"my potato store"} />
                <ProductCard name="fish taco" image={FishTacos} price={17.52} storeName={"Luc's famous tacos"} />
                <ProductCard name="brisket" image={Brisket} price={32.90} storeName={"arbees"} />
                <ProductCard name="eggplant" image={Eggplant} price={9} storeName={"Luc's roof top garden"} />
                <ProductCard name="empanadas" image={Empanadas} price={13.41} storeName={"my abuelita"} />
                <ProductCard name="gouda" image={Gouda} price={22.22} storeName="some good gouda" />
            </div>
        </div>
    );
}