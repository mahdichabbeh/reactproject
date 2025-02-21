import React from "react";
import ProductCard from "../Tools/ProductCard";
import { recommendedProducts } from "../../utils";



export default function CrossSellProducts() {
  return (
    <div className="cross-sells">
      <h2>You may be interested in...</h2>
      <div className="products row">
        {recommendedProducts.map((product) => (
          
            <ProductCard product={product}  />
          
        ))}
      </div>
    </div>
  );
}
