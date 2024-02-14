import { useState, useEffect } from "react";
import ImageUploadDragOver from "../components/ImageUploadDragOver";
import CategoryCheckbox from "../components/CategoryCheckbox";

import { ADD_PRODUCT } from "../utils/mutations";
import { GET_CATEGORIES } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { UPLOAD_IMAGE } from "../utils/mutations";

export default function AddProduct() {
    const [addProduct, {error}] = useMutation(ADD_PRODUCT);

    // MVP AND BEYOND - cache product information in local storage here
    /*
    useEffect(() => {
    }, []);
    */
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState("");
    const [productCategories, setProductCategories] = useState([]);


    const {loading, data} = useQuery(GET_CATEGORIES);
    console.log('data -> ', data);
    
    if (loading) {
        return <h5>Fetching categories...</h5>;
    }

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

        setProductPrice(priceValue);
    }

    function handleCategoryClick({target}) {
        const categoryName = target.name;
        console.log('target -> ', target);
        setProductCategories([...productCategories, categoryName]);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        console.log('e -> ', e);

        // If user attempts to submit only whitespace
        if (!productName.trim().length) {
            return alert("Product name must be a valid string!");
        }

        if (productPrice < 0) {
            return alert("A product can't have a negative price!");
        }

        if (!productDescription.trim().length) {
            return alert("Product description must be a valid string!");
        }

        const image = document.getElementById("product-preview").src;
        if (!image) {
            return alert("Your product must have an image!");
        }

        // TODO: Get rid of dummy addProduct function and comment back in
        // the below mutation
        console.log(typeof(productPrice));
        console.log('productPrice -> ', productPrice);
        
        return await addProduct({
            variables: {
                name: productName,
                price: productPrice,
                description: productDescription,
                image: image,
                category: productCategories
            }
        })
        
        /*
        // DELETE ME SOON
        addProduct({
            name: productName,
            price: productPrice,
            description: productDescription,
            image: image,
            category: productCategories
        })
        */
    }

    return (
        <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-center">Add a Product to Store</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="product-name">Enter a product name</label>
                    <input
                    type="text" id="product-name"
                    className="border-dashed rounded-lg border-2 border-slate-950 w-1/5"
                    onChange={handleNameChange}>
                    </input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="product-price">Enter a product price</label>
                    <input
                    type="text" inputMode="numeric" pattern="[0-9\.,]*" id="product-price"
                    className="border-dashed rounded-lg border-2 border-slate-950 w-1/5"
                    onChange={handlePriceChange}>
                    </input>
                </div>
                <div className="flex flex-col">
                    <ImageUploadDragOver />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="product-description">Make a Product Description</label>
                    <input
                    type="text" id="product-description"
                    className="border-dashed rounded-lg border-2 border-slate-950 w-1/5 h-1/5"
                    onChange={handleDescriptionChange}>
                    </input>
                </div>
                <div className="flex flex-col">
                    <CategoryCheckbox id="search-canned-goods" name="cannedGoods" onClick={handleCategoryClick} />
                </div>
                <div className="flex flex-col">
                    <button className="bg-red-800 text-white rounded w-1/5" onClick={() => {}}>
						<span>Add Product</span>
					</button>
                </div>
            </form>
        </div>
    )
}