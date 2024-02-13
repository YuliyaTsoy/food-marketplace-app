/*
  Image Upload component.
*/
import { useState } from "react"

// TODO: dummy uploadImage function reimplement
function UploadImage(image) {
  console.log('uploading image -> ', image);
}

export default function ImageUploadDragOver() {

  const [productImageUrl, setProductImageUrl] = useState("");
  const [hasProductImage, setHasProductImage] = useState(false);

  // Prevent these events. The only event we are concerned with image upload is
  // a onDrop
  function handleImageDrag(e) {
    e.preventDefault();
  }

  function handleImageCancel(e) {
    console.log(`e -> ${e}`);

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
      console.log("product url -> ", productImageUrl);
    }
  }

  return (
    <div>
      <label htmlFor="imageUpload">Drag in a product Image</label>
      <div className="add-product-image-container bg-red-200 hover:bg-red-300 w-1/5 aspect-square border-dashed rounded-lg border-2 border-red-800" onDragOver={handleImageDrag} onDragEnter={handleImageDrag} onDrop={handleImageDrop}>
        <input type="file" accept="image/*" className="hidden multiple" id="imageUpload" />
        {/* No alt on this img until an image has bee */}
        <img src={productImageUrl} title="Product image preview" id="product-preview" className="object-fill" />
        {/* If product image is set. Add a cancel button */}
        {hasProductImage ? 
        <div className="cancel-image-button" title="Cancel image upload" onClick={handleImageCancel}>
          <div>
            x
          </div>
        </div>
        :
        <></>}
      </div>
    </div>
  )
}