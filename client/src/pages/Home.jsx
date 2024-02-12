import React, { useState, useEffect, useRef, useMemo } from 'react'

import Filter from '../components/Filter'

import { titleCaseString } from '../utils/strings';

// dummy imports
import {Tomato, Samosa, Potatoes, FishTacos, Brisket, Eggplant, Empanadas, Gouda} from '../assets/samplepics/index'

class Product extends React.Component {
    constructor(props) {
        super(props);

        // Create ref to this Product
        this.ref = React.createRef();
    }
    render() {
        const {name, image, price, storeName} = this.props;
        return (
                <div className="product-card rounded-lg" ref={this.ref}>
                    <div className="product-picture-box">
                        <img
                        src={image}
                        alt={`thumbnail of ${name}`}
                        title="Click to see more product information"
                        loading="lazy" className="fit-picture mx-auto" />
                    </div>
                    <div
                    className="product-description ml-2.5"
                    title={`${name} sold by "${storeName}"`}
                    >
                        {/* price tag is trimmed down to 2 decimal points */}
                        <h2 className="price-tag font-bold">{`$${price.toFixed(2)}`}</h2>
                        <h3 className="product-name text-xl line-clamp-1">{titleCaseString(name)}</h3>
                        <h4 className="store-name font-light line-clamp-1">{storeName}</h4>
                    </div>
                </div>
        )
    }
}

export default function Home() {
    return (
        <div className="home-page flex">
            <Filter/>
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                <Product name="tomato" image={Tomato} price={432.891} storeName={"Luc's store"} />
                <Product name="samosa" image={Samosa} price={12.32} storeName={"A store with way way too long of a name"} />
                <Product name="potato" image={Potatoes} price={6.99} storeName={"my potato store"} />
                <Product name="fish taco" image={FishTacos} price={17.52} storeName={"Luc's famous tacos"} />
                <Product name="brisket" image={Brisket} price={32.90} storeName={"arbees"} />
                <Product name="eggplant" image={Eggplant} price={9} storeName={"Luc's roof top garden"} />
                <Product name="empanadas" image={Empanadas} price={13.41} storeName={"my abuelita"} />
                <Product name="gouda" image={Gouda} price={22.22} storeName="some good gouda" />
            </div>
        </div>
    );
}
