/*
  Image Upload component.
*/
import { useState } from "react"
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function ImageUploadDragOver() {

  const [productImageUrl, setProductImageUrl] = useState("");
  const [hasProductImage, setHasProductImage] = useState(false);

  // Prevent these events. The only event we are concerned with image upload is
  // a onDrop
  function handleImageDrag(e) {
    e.preventDefault();
  }

  function handleImageCancel(e) {
    setProductImageUrl("");
    setHasProductImage(false);
  }

  function handleImageDrop(e) {
    e.preventDefault();
    console.log("e -> ", e);
    const imagePreviewEl = document.getElementById("product-preview");
    const productImage = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        imagePreviewEl.src = reader.result;
      },
      false
    );
  
    if (productImage) {
      setProductImageUrl(reader.readAsDataURL(productImage));
      setHasProductImage(true);
    }
  }

  return (
    <div>
      <div
      className="block w-full h-1/5 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      onDragOver={handleImageDrag}
      onDragEnter={handleImageDrag}
      onDrop={handleImageDrop}>
        <input type="file" accept="image/*" className="hidden multiple" id="imageUpload" />
        {/* No alt on this img until an image has bee */}
        <div className="add-product-image-container">
          <img src={productImageUrl} title="Product image preview" id="product-preview" className="object-fill" />
          {/* If product image is set. Add a cancel button */}
          {hasProductImage ? 
          <div className='grid grid-cols-4 justify-items-end'>
            <XCircleIcon className='cancel-image-button h-10 w-14 cursor-pointer'
              style={{ color: 'grey' }} onClick={() => {}} />
          </div>
          :
          <></>}
        </div>
      </div>
    </div>
  )
}