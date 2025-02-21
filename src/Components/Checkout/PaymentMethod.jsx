import React from "react";
import { useFormContext } from "react-hook-form";

export default function PaymentMethod() {
  const { register, watch, formState: { errors } } = useFormContext();
  const selectedPayment = watch("paymentMethod"); // To track selected payment method

  return (
    <div id="payment">
      <h3>Payment Method</h3>
      <ul className="payment_methods methods">
        
        {/* Direct Bank Transfer */}
        <li className="payment_method_bacs">
          <input {...register("paymentMethod")} type="radio" value="bank_transfer" id="payment_method_bacs" className="input-radio" />
          <label htmlFor="payment_method_bacs">Direct Bank Transfer</label>
          {selectedPayment === "bank_transfer" && (
            <div className="payment_box payment_method_bacs">
              <p>Make your payment directly into our bank account. Your order won’t be shipped until the funds have cleared.</p>
            </div>
          )}
        </li>

        {/* Cheque Payment */}
        <li className="payment_method_cheque">
          <input {...register("paymentMethod")} type="radio" value="cheque" id="payment_method_cheque" className="input-radio" />
          <label htmlFor="payment_method_cheque">Cheque Payment</label>
          {selectedPayment === "cheque" && (
            <div className="payment_box payment_method_cheque">
              <p>Please send your cheque to our store address.</p>
            </div>
          )}
        </li>

        {/* PayPal */}
        <li className="payment_method_paypal">
          <input {...register("paymentMethod")} type="radio" value="paypal" id="payment_method_paypal" className="input-radio" />
          <label htmlFor="payment_method_paypal">
            PayPal 
            <img alt="PayPal Acceptance Mark" src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png" />
            <a title="What is PayPal?" 
               className="about_paypal" 
               href="https://www.paypal.com/gb/webapps/mpp/paypal-popup" 
               target="_blank" 
               rel="noopener noreferrer">
              What is PayPal?
            </a>
          </label>
          {selectedPayment === "paypal" && (
            <div className="payment_box payment_method_paypal">
              <p>Pay via PayPal; you can use your credit card even if you don’t have a PayPal account.</p>
            </div>
          )}
        </li>
      </ul>

      {/* Validation Error Message */}
      <p className="error">{errors.paymentMethod?.message}</p>
    </div>
  );
}
