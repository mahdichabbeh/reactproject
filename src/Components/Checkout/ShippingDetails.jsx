import React from "react";
import { useFormContext } from "react-hook-form";

export default function ShippingDetails({ shipDifferent, setShipDifferent }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="woocommerce-shipping-fields">
      <h3>
        <label>
          <input
            type="checkbox"
            checked={shipDifferent}
            onChange={() => setShipDifferent(!shipDifferent)}
          />{" "}
          Ship to a different address?
        </label>
      </h3>

      {shipDifferent && (
        <div className="shipping_address">
          <h3>Shipping Details (Receiver)</h3>

          {/* Civility */}
          <p className="form-row form-row-wide">
            <label>
              Civility <abbr title="required" className="required">*</abbr>
            </label>
            <select {...register("shippingAddress.civility", { required: shipDifferent ? "Civility is required" : false })} className="input-text">
              <option value="">Select...</option>
              <option value="Mr">Mr</option>
              <option value="Mme">Mme</option>
              <option value="Mlle">Mlle</option>
            </select>
            {errors.shippingAddress?.civility && <p className="error">{errors.shippingAddress.civility.message}</p>}
          </p>

          {/* First Name */}
          <p className="form-row form-row-first">
            <label>
              First Name <abbr title="required" className="required">*</abbr>
            </label>
            <input {...register("shippingAddress.firstName", { required: shipDifferent ? "First Name is required" : false })} className="input-text" />
          </p>

          {/* Last Name */}
          <p className="form-row form-row-last">
            <label>
              Last Name <abbr title="required" className="required">*</abbr>
            </label>
            <input {...register("shippingAddress.lastName", { required: shipDifferent ? "Last Name is required" : false })} className="input-text" />
          </p>

          {/* Street Address */}
          <p className="form-row form-row-wide">
            <label>
              Street Address <abbr title="required" className="required">*</abbr>
            </label>
            <input {...register("shippingAddress.street", { required: shipDifferent ? "Street Address is required" : false })} className="input-text" />
          </p>

          {/* City */}
          <p className="form-row form-row-wide">
            <label>
              City <abbr title="required" className="required">*</abbr>
            </label>
            <input {...register("shippingAddress.city", { required: shipDifferent ? "City is required" : false })} className="input-text" />
          </p>

          {/* Zip Code */}
          <p className="form-row form-row-wide">
            <label>
              Zip Code <abbr title="required" className="required">*</abbr>
            </label>
            <input {...register("shippingAddress.zipCode", { required: shipDifferent ? "Zip Code is required" : false })} className="input-text" />
          </p>
        </div>
      )}
    </div>
  );
}
