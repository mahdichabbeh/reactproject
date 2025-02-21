import logo from "../img/logo.png";
import { Link , useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeCart } from "../Slices/CartSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { cartId,subtotal ,totalAmount, items } = useSelector((state) => state.cart);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
    }
  };
  // Initialize cart if cartId is missing
  useEffect(() => {
    if (!cartId) {
      dispatch(initializeCart());
    }
  }, [cartId, dispatch]);

  return (
    <div className="container">
      <div className="row">
        {/* Logo */}
        <div className="col-sm-4">
          <div className="logo" style={{ width: "100px", height: "100px" }}>
            <h1>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="col-sm-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              style={{ marginTop: "30px" }}
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {/* Cart Section */}
        <div className="col-sm-4">
          <div className="shopping-item">
            <Link to={cartId ? `/carts/${cartId}` : "#"}>
              Cart: €<span className="cart-amunt">{(totalAmount*(1/1.2)).toFixed(2)}</span>{" "}
              <i className="fa fa-shopping-cart"></i>{" "}
              <span className="product-count">{items.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
