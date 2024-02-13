import { useState } from "react";
import ImageUploadDragOver from "../components/ImageUploadDragOver";


function dummySubmit(name, price, image, description, categories) {
    console.log(`
name = ${name}
price = ${price}
image = ${image}
description = ${description}
categories = ${categories}
`);
}

export default function AddProduct() {

    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState("");

    function handleNameChange({target}) {
        setProductName(target.value);
    }

    function handleDescriptionChange({target}) {
        setProductDescription(target.value);
    }

    function handlePriceChange({target}) {
        // This is a string and must be parsed first
        let priceText = target.value;

        const priceValue = Number.parseFloat(priceText);
        if (isNaN(priceValue)) {
            return;
        }

        setProductPrice(priceValue.toPrecision(2));
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        console.log('e -> ', e);

        // If user attempts to submit only whitespace
        if (!productName.trim().length) {
            return alert("Product name must be a valid string!");
        }

        if (!productDescription.trim().length) {
            return alert("Product description must be a valid string!");
        }

        if (productPrice < 0) {
            return alert("A product can't have a negative price!");
        }


        dummySubmit(productName, productPrice)


        // clear form
    }

    return (
        <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-center">Add a Product to Store</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="product-name">Enter a product name</label>
                    <input type="text" id="product-name" className="border-dashed rounded-lg border-2 border-slate-950 w-1/5" onChange={handleNameChange}></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="product-price">Enter a product price</label>
                    <input type="text" inputMode="numeric" pattern="[0-9\.,]*" id="product-price" className="border-dashed rounded-lg border-2 border-slate-950 w-1/5" onChange={handlePriceChange}></input>
                </div>
                <div className="flex flex-col">
                    <ImageUploadDragOver />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="product-description">Make a Product Description</label>
                    <input type="text" id="product-description" className="border-dashed rounded-lg border-2 border-slate-950 w-1/5 h-1/5" onChange={handleDescriptionChange}></input>
                </div>
                <div className="flex flex-col">
                    <input type="submit" value="Add Product!"/>
                </div>
            </form>
        </div>
    )
}