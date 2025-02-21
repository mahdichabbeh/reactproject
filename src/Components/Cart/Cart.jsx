import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCart, checkoutCart } from "../../Slices/CartSlice";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import CrossSellProducts from "./CrossSellProducts"
import { Link } from "react-router-dom";



export default function CartComponent() {
  const dispatch = useDispatch();
  const { items, totalAmount, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  if (loading) return <p>Loading cart...</p>;


  return (
    <div className="single-product-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="product-content-right">
              <div className="woocommerce">
                <table className="shop_table cart">
                  <thead>
                    <tr>
                      <th className="product-remove">&nbsp;</th>
                      <th className="product-thumbnail">&nbsp;</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                    <tr>
                      <td className="actions" colSpan="6">
                        <Link to={"/checkout"}><button className="checkout-button button alt wc-forward">
                          Checkout
                        </button></Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Cart Summary */}
              <CrossSellProducts />
                <CartTotal totalAmount={totalAmount} />

            </div>                    
          </div>
        </div>
      </div>
    </div>
  );
}

                
