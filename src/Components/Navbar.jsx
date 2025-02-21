import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
  }, []);

  return (
    <div className="mainmenu-area">
        <div className="container">
            <div className="row">
                <div className="navbar">
                    <ul className="nav navbar-nav navbar-expand">
                        <li>
                        <NavLink to="/">Home</NavLink> 
                        </li>
                        {categories.map((category) => (
                        <li key={category.id}>
                            <NavLink to={`/products-lists/${category.id}`}>{category.name}</NavLink>
                        </li>
                        ))}
                    </ul>
                </div>  
            </div>
        </div>
    </div>
  );
};

export default Navbar;
