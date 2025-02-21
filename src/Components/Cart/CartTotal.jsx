import React from "react";

export default function CartTotal({ totalAmount }) {

  const subTotal = ((totalAmount*(1/1.2))).toFixed(2);
  
  const tax = (totalAmount - subTotal).toFixed(2);

  return (
    <div className="cart_totals">
      <h2>Cart Totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Cart Subtotal</th>
            <td><span className="amount">${subTotal}</span></td>
          </tr>
          <tr className="shipping">
            <th>Tax (20%)</th>
            <td>${tax}</td>
          </tr>
          <tr className="order-total">
            <th>Order Total</th>
            <td><strong><span className="amount">${totalAmount}</span></strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
