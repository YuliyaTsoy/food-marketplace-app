import ImageUploadDragOver from "../components/ImageUploadDragOver"

export default function AddProduct() {
    return (
        <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-center">Add a Product to Store</h2>
            <form>
                <div className="flex flex-col">
                    <label htmlFor="product-name">Enter a product name</label>
                    <input type="text" id="product-name" className="border-dashed rounded-lg border-2 border-slate-950 w-1/5"></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="product-price">Enter a product price</label>
                    <input type="text" inputMode="numeric" pattern="[0-9\.,]*" id="product-price" className="border-dashed rounded-lg border-2 border-slate-950 w-1/5"></input>
                </div>
                <div className="flex flex-col">
                    <ImageUploadDragOver />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="product-description">Make a Product Description</label>
                    <input type="text" id="product-description" className="border-dashed rounded-lg border-2 border-slate-950 w-1/5 h-1/5"></input>
                </div>
            </form>
            
        </div>
    )
}