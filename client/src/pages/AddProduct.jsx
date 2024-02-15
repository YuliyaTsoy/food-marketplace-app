import { useState, useEffect } from "react";
import ImageUploadDragOver from "../components/ImageUploadDragOver";

import { ADD_PRODUCT } from "../utils/mutations";
import { GET_CATEGORIES } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

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
    const [productCategory, setProductCategory] = useState({
        name: '',
        key: ''
    });

    const {loading, data} = useQuery(GET_CATEGORIES);

    const categories = data?.categories || {};
    // Add the pseudo category: "Add a new category" which allows
    // a user to create a new one

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

    function handleCategoryClick(name, key) {
        // deselect current category -- this way we can only select one
        // checkbox in the same manner as a radio input
        const categoryCheckboxes = document.querySelectorAll("input[type=checkbox]");
        for (const checkbox of categoryCheckboxes) {
            if (checkbox.name === name) {
                continue;
            }
            checkbox.checked = false;
        }
        setProductCategory({name, key});
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

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
        
        await addProduct({
            variables: {
                name: productName,
                price: productPrice,
                description: productDescription,
                image: image,
                // Just-In-Time we convert productCat
                category: productCategory.key
            }
        })

        // relocate back to users' personal store upon submit
        document.location.replace('/Store');
    }
   return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add a Product to Your Store</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6 w-full" onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="product-name">Enter a product name</label>
                    <div className="mt-2">
                        <input
                        type="text" id="product-name"
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleNameChange}>
                        </input>
                    </div>
                    <label htmlFor="product-price">Enter a product price</label>
                    <div className="mt-2">
                        <input
                        type="text" inputMode="numeric" pattern="[0-9\.,]*" id="product-price"
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handlePriceChange}>
                        </input>
                    </div>
                    <label htmlFor="imageUpload">Add a product Image</label>
                    <div className="mt-2 add-product-image-container">
                        <ImageUploadDragOver />
                    </div>
                    <label htmlFor="product-description">Make a Product Description</label>
                    <div className="mt-2">
                        <textarea
                        id="product-description"
                        className="block w-full h-32 rounded-md border-0 align-top py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleDescriptionChange}>
                        </textarea>
                    </div>
                    <label htmlFor="product-category">Select an exisiting Product Category</label>
                    <div className="mt-2 border-red-800 h-32">
                    {categories ? (
                        <div className="add-product-category">
                            {categories.map((category) => {
                                return (
                                    <div className="product-category-checkbox-container">
			                            <input
                                        type="checkbox"
                                        id={category._id}
                                        key={category._id} name={category.name} onClick={() => handleCategoryClick(category.name, category._id)} />
			                            <label htmlFor={category._id} className="ml-2">{category.name}</label>
                                    </div>
                                )
                            })
                                
                            }
                        </div>
                    ) : <></>}
                    </div>
                </div>
                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create!
                    </button>
                </div>
            </form>
        </div>
    </div>

   )
   
}