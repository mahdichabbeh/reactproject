import React from "react";
import { Link } from "react-router-dom";

export default function ProductBreadcrumb({ category, product }) {
  return (
    <div className="product-breadcroumb">
      <Link to="/">Home</Link>
      <Link to={`/products-lists/${category.id}`}>{category.name}</Link>
      <Link to={`/product/${product.id}`}>{product.name}</Link>
    </div>
  );
}
