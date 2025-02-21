import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Slices/CartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { cartId } = useSelector((state) => state.cart);
  const quantity = 1;
  const handleAddToCart = () => {
    if (!cartId) return;
    dispatch(addToCart({ product, quantity, cartId })); // **Pass correct quantity**
  };
  return (
    <div className="col-md-3 col-sm-6">
      <div className="single-shop-product">
        <div className="product-upper">
          <img
            src={`/produts-img/${product.name.split(" ")[0]}/${
              product.imageName
            }`}
            alt={product.name}
          />
        </div>
        <h2>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h2>
        <div className="product-carousel-price">
          <ins>${product.price.toFixed(2)}</ins>{" "}
          {product.discountRate > 0 && (
            <del>
              ${(product.price / (1 - product.discountRate / 100)).toFixed(2)}
            </del>
          )}
        </div>
        <div className="product-option-shop">
          <button className="add_to_cart_button" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
