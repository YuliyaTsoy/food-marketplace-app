import React, { useState, useEffect, useRef, useMemo } from 'react'

import Filter from '../components/Filter'

// dummy import of tomato image
import Tomato from '../assets/tomato.jpg'

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
            <div className="product-card bg-red-200 rounded-lg" ref={this.ref}>
                <div className="product-picture-box">
                    <img
                    src={image}
                    alt={`Product image of ${name}`}
                    title={`Product image of ${name}`}
                    loading="lazy" className="fit-picture" />
                </div>
                <div className="product-description">
                    {/* price tag is trimmed down to 2 decimal points */}
                    <h2 className="price-tag">{`$${price.toFixed(2)}`}</h2>
                    <h3 className="product-name">{titleCaseName(name)}</h3>
                    <h4 className="store-name">{storeName}</h4>
                </div>
            </div>
        )
    }
}

export default function Home() {
    return (
        <div className="home-page">
            <Filter />
            <div className="grid gap-4 grid-cols-4">
                <Product name="tomato" image={Tomato} price={432.891} storeName={"Luc's store"} />
            </div>
        </div>
    );
}
