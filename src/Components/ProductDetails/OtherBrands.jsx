import React from "react";
import { Link } from "react-router-dom";

export default function OtherBrands({ otherBrands }) {
  return (
    <div className="single-sidebar">
      <h2 className="sidebar-title">Other Brands</h2>
      <ul>
        {otherBrands.map((brand) => (
          <li key={brand.id}>
            <Link to={`/products-lists/${brand.id}`}>{brand.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
