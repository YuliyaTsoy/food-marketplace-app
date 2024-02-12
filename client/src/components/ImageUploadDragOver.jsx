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

  // Prevent these events. The only event we are concerned with image upload is
  // a onDrop
  function handleImageDrag(e) {
    e.preventDefault();
  }

  function handleImageDrop(e) {
    e.preventDefault();
    console.log("e -> ", e);
    const imagePreviewEl = document.getElementById("product-preview");
    const productImage = e.dataTransfer.files[0];
    const reader = new FileReader();
    console.log("product url -> ", reader.readAsDataURL(productImage));

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
    }
  }

  return (
  <div className="bg-slate-300 hover:bg-slate-400 size-52 border-dashed border-2 border-slate-950" onDragOver={handleImageDrag} onDragEnter={handleImageDrag} onDrop={handleImageDrop}>
    <label htmlFor="imageUpload">Drag in a product Image</label>
    <input type="file" accept="image/*" className="hidden multiple" id="imageUpload" />
    <img src={productImageUrl} alt="Product image preview" id="product-preview" />
  </div>
  )
}