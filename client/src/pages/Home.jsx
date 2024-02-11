import React, { useState, useEffect, useRef, useMemo } from 'react'

import Filter from '../components/Filter'

// dummy imports
import {Tomato, Samosa} from '../assets/samplepics/index'

// Title case a string. Guaranteed to work regardless of user input
function titleCaseName(string) {
    const capWords = [];
    for (const word of string.split(' ')) {
        capWords.push(word.substring(0, 1).toUpperCase() + word.substring(1));
    }
    return capWords.join(' ');
}


class Product extends React.Component {
    constructor(props) {
        super(props);

        // Create ref to this Product
        this.ref = React.createRef();
    }
    render() {
        const {name, image, price, storeName} = this.props;
        return (
            <article>
                <div className="product-card rounded-lg" ref={this.ref}>
                    <div className="product-picture-box">
                        <img
                        src={image}
                        alt={`thumbnail of ${name}`}
                        title="Click to see more product information"
                        loading="lazy" className="fit-picture mx-auto" />
                    </div>
                    <div className="product-description ml-2.5 flex">
                        {/* price tag is trimmed down to 2 decimal points */}
                        <h2 className="price-tag font-bold">{`$${price.toFixed(2)}`}</h2>
                        <h3 className="product-name text-xl">{titleCaseName(name)}</h3>
                        <h4 className="store-name font-light">{storeName}</h4>
                    </div>
                </div>
            </article>

        )
    }
}

export default function Home() {
    return (
        <div className="home-page">
            <Filter />
            <div className="grid gap-4 grid-cols-4">
                <Product name="tomato" image={Tomato} price={432.891} storeName={"Luc's store"} />
                <Product name="samosa" image={Samosa} price={12.32} storeName={"A store with way way too long of a name"} />
            </div>
        </div>
    );
}
