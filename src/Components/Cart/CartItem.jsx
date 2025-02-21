import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart , updateCartItemQuantity} from "../../Slices/CartSlice";
import { Link } from "react-router-dom";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const { cartId } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(item.qty); // Local state for quantity
  const handleRemove = () => {
    dispatch(removeFromCart({ productId: item.id, cartId }));
  };

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) return; // Prevent negative or zero quantity

    setQuantity(newQty);
    
    dispatch(updateCartItemQuantity({ productId: item.id, quantity: newQty, cartId }));
  };

  return (
    <tr className="cart_item">
      <td className="product-remove">
        <button className="remove" onClick={handleRemove}>×</button>
      </td>
      <td className="product-thumbnail">
        <Link to={`/product/${item.id}`}>
          <img src={`/produts-img/${item.name.split(" ")[0]}/${item.imageName}`} alt={item.name} className="shop_thumbnail" />
        </Link>
      </td>
      <td className="product-name">
        <Link to={`/product/${item.id}`}>{item.name}</Link>
      </td>
      <td className="product-price">
        <span className="amount">${item.price.toFixed(2)}</span>
      </td>
      <td className="product-quantity">
        <div className="quantity buttons_added">
          <button className="minus" onClick={() => handleQuantityChange(quantity - 1)}>-</button>
          <input
            type="number"
            className="input-text qty text"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
          />
          <button className="plus" onClick={() => handleQuantityChange(quantity + 1)}>+</button>
        </div>
      </td>
      <td className="product-subtotal">
        <span className="amount">${(item.price * item.qty).toFixed(2)}</span>
      </td>
    </tr>
  );
}
