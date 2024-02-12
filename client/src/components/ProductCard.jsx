import React from 'react';
import { titleCaseString } from '../utils/strings';

class ProductCard extends React.Component {
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

export default ProductCard;