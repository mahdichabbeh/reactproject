import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { checkoutCart } from "../../Slices/CartSlice";
import { useNavigate } from "react-router-dom";
import BillingDetails from "./BillingDetails";
import ShippingDetails from "./ShippingDetails";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

// Validation Schema
const schema = yup.object().shape({
  customer: yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
  }),
  billingAddress: yup.object().shape({
    civility: yup.string().required("Civility is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    street: yup.string().required("Street Address is required"),
    city: yup.string().required("City is required"),
    county: yup.string().required("County is required"),
    zipCode: yup.string().required("Zip Code is required"),
  }),
  shippingAddress: yup.object().shape({
    civility: yup.string().when("shipDifferent", {
      is: true,
      then: (schema) => schema.required("Civility is required"),
    }),
    firstName: yup.string().when("shipDifferent", {
      is: true,
      then: (schema) => schema.required("First Name is required"),
    }),
    lastName: yup.string().when("shipDifferent", {
      is: true,
      then: (schema) => schema.required("Last Name is required"),
    }),
    street: yup.string().when("shipDifferent", {
      is: true,
      then: (schema) => schema.required("Street Address is required"),
    }),
    city: yup.string().when("shipDifferent", {
      is: true,
      then: (schema) => schema.required("City is required"),
    }),
    county: yup.string().when("shipDifferent", {
      is: true,
      then: (schema) => schema.required("County is required"),
    }),
    zipCode: yup.string().when("shipDifferent", {
      is: true,
      then: (schema) => schema.required("Zip Code is required"),
    }),
  }),
  paymentMethod: yup.string().required("Please select a payment method"),
});
export default function CheckoutForm() {
  const [shipDifferent, setShipDifferent] = useState(false);
  const methods = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartId, items, totalAmount, subTotal, tax } = useSelector(
    (state) => state.cart
  );

  const onSubmit = async (data) => {

    const orderData = {
      total: totalAmount,
      subTotal,
      tax,
      items,
      customer: {
        email: data.email, // ✅ Fix: Corrected path
        phone: data.phone, // ✅ Fix: Corrected path
        billingAddress: {
          civility: data.billingAddress?.civility,
          firstName: data.billingAddress?.firstName,
          lastName: data.billingAddress?.lastName,
          zipCode: data.billingAddress?.zipCode,
          street: data.billingAddress?.street,
          companyName: data.billingAddress?.companyName || "",
          county: data.billingAddress?.county,
          city: data.billingAddress?.city,
        },
        shippingAddress: shipDifferent
          ? {
              civility: data.shippingAddress?.civility,
              firstName: data.shippingAddress?.firstName,
              lastName: data.shippingAddress?.lastName,
              zipCode: data.shippingAddress?.zipCode,
              street: data.shippingAddress?.street,
              companyName: data.shippingAddress?.companyName || "",
              county: data.shippingAddress?.county,
              city: data.shippingAddress?.city,
            }
          : null, // ✅ Fix: If shipping same as billing, send `null`
      },
      paymentMethod: data.paymentMethod,
    };

    console.log("Order data to be sent:", orderData); // ✅ Debug request payload

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order submitted successfully:", result);

      dispatch(checkoutCart());
      navigate("/");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="single-product-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="product-content-right">
              <div className="woocommerce">
                <h2 className="product-bit-title text-center">Checkout</h2>

                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(
                      (data) => {
                        console.log("Submitting order with data:", data); // ✅ Debugging
                        onSubmit(data);
                      },
                      (errors) => {
                        console.error("Form validation errors:", errors); // ❌ Logs validation issues
                      }
                    )}
                    className="checkout"
                  >
                    <div id="customer_details" className="col2-set">
                      <div className="col-6">
                        <BillingDetails />
                      </div>

                      <div className="col-6">
                        <ShippingDetails
                          shipDifferent={shipDifferent}
                          setShipDifferent={setShipDifferent}
                        />
                      </div>
                    </div>

                    <OrderSummary />

                    <PaymentMethod />

                    <div className="form-row place-order">
                      <button type="submit" className="button alt">
                        Place Order
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
