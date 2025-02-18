import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
                        <Link to="/">Home</Link> 
                        </li>
                        {categories.map((category) => (
                        <li key={category.id}>
                            <Link to={`/shop/${category.id}`}>{category.name}</Link>
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
