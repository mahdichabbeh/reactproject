import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Slices/CartSlice";

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { cartId } = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    if (!cartId) return;
    dispatch(addToCart({ product, quantity, cartId })); // **Pass correct quantity**
  };

  return (
    <div className="product-inner">
      <h2 className="product-name">{product.name}</h2>
      <div className="product-inner-price">
        <ins>${product.price.toFixed(2)}</ins>{" "}
        {product.discountRate > 0 && (
          <del>
            ${(product.price / (1 - product.discountRate / 100)).toFixed(2)}
          </del>
        )}
      </div>

      {/* Quantity and Add to Cart */}
      <div className="cart">
        <div className="quantity">
          <button
            className="minus"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <input
            type="number"
            size="4"
            className="input-text qty text"
            title="Qty"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            min="1"
          />
          <button
            className="plus"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <button className="add_to_cart_button" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>

      {/* Product Description */}
      <div className="product-inner-category">
        <h2>Product Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
