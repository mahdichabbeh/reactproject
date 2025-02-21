import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
  const [categoryData, setCategoryData] = useState([]);
  async function fetchdata() {
    try {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategoryData(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="footer-top-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <div className="footer-about-us">
              <h2>
                <span>MyStore</span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Perferendis sunt id doloribus vero quam laborum quas alias
                dolores blanditiis iusto consequatur.
              </p>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="footer-menu">
              <h2 className="footer-wid-title">Categories</h2>
              <ul>
                {categoryData.map((category) => (
                  <li key={category.id}>
                    <Link to={`/products-lists/${category.id}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="footer-newsletter">
              <h2 className="footer-wid-title">Newsletter</h2>
              <p>
                Sign up for our newsletter and get exclusive deals straight to
                your inbox!
              </p>
              <div className="newsletter-form">
                <form>
                  <input type="email" placeholder="Type your email" />
                  <button type="submit" value="Subscribe">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
