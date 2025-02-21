import React from "react";
import thumb1 from "../../img/product-thumb-1.jpg";
import thumb2 from "../../img/product-thumb-2.jpg";
import thumb3 from "../../img/product-thumb-3.jpg";

export default function ProductImages({ product }) {
  return (
    <div className="product-images">
      <div className="product-main-img">
        <img src={`/produts-img/${product.name.split(" ")[0]}/${product.imageName}`} alt={product.name} />
      </div>
      <div className="product-gallery">
        <img src={thumb1} alt="Thumbnail 1" />
        <img src={thumb2} alt="Thumbnail 2" />
        <img src={thumb3} alt="Thumbnail 3" />
      </div>
    </div>
  );
}
