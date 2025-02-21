import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecentlyViewed } from "../../utils/cookies";

export default function ProductList({ title, apiUrl, buttonOn }) {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (apiUrl) {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error(`Error fetching ${title}:`, error));
    } else {
      setProducts(getRecentlyViewed());
    }
  }, [apiUrl]); 

  return (
    <div className="single-product-widget">
      <h2 className="product-wid-title">{title}</h2>

      {/* Conditionally show the button */}
      {buttonOn && (
        <button className="wid-view-more" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View All"}
        </button>
      )}

      <div className="product-grid">
        {products.slice(0, showAll ? products.length : 3).map((product) => (
          <div className="single-wid-product" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                src={`/produts-img/${product.name.split(" ")[0]}/${product.imageName}`}
                alt={product.name}
                className="product-thumb"
              />
            </Link>
            <h2>
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h2>
            <div className="product-wid-rating">
              {[...Array(product.review)].map((_, i) => (
                <i key={i} className="fa fa-star"></i>
              ))}
            </div>
            <div className="product-wid-price">
              <ins>
                $
                {product.discountRate
                  ? (product.price - product.price * (product.discountRate / 100)).toFixed(2)
                  : product.price.toFixed(2)}
              </ins>{" "}
              {product.discountRate > 0 && <del>${product.price.toFixed(2)}</del>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
