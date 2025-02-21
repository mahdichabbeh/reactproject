import React from "react";
import { useSelector } from "react-redux";

export default function OrderSummary() {
  const { items, totalAmount } = useSelector((state) => state.cart);

  return (
    <div id="order_review">
      <h3>Your Order</h3>
      <table className="shop_table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name} × {item.qty}</td>
              <td>€{(item.price * item.qty).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Cart Subtotal</th>
            <td>€{(totalAmount*(1/1.2)).toFixed(2)}</td>
          </tr>
          <tr>
            <th>Tax (20%)</th>
            <td>€{(totalAmount - totalAmount*(1/1.2)).toFixed(2)}</td>
          </tr>
          <tr>
            <th>Order Total</th>
            <td><strong>€{totalAmount.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
