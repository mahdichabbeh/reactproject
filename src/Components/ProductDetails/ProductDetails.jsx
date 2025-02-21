import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAndCategories } from "../../Slices/ProductSlice";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import OtherBrands from "./OtherBrands";
import ProductList from "../Tools/ProductList"; // Recently Viewed component
import { addRecentlyViewed } from "../../utils/cookies";

export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { items: products, categories, loading } = useSelector((state) => state.products);
  // ✅ Fetch products & categories once if not already loaded
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchProductsAndCategories());
    }
  }, [dispatch, categories.length]);

  // ✅ Extract Product Details from nested structure 
  const product = useMemo(() => {
    for (const category of products) {
      const foundProduct = category.items.find((p) => String(p.id) === String(productId));
      if (foundProduct) {
        return { ...foundProduct, categoryName: category.name };
      }

    }
    
    return null;
  }, [productId, categories]);

  const currentCat = categories.find((cat) => cat.name === product.categoryName);
  product.categoryId = currentCat.id
  // ✅ Add to Recently Viewed when product is available
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product]);
console.log(product)
  const categoryInfo = product
    ? { name: product.categoryName, id: product.categoryId }
    : { name: "", id: "" };


  const otherBrands = useMemo(() => {
    return categories
      .filter((cat) => cat.id !== categoryInfo.id) // Exclude current category
      .sort(() => 0.5 - Math.random()) // Shuffle
      .slice(0, 3); // Pick 3 random categories
  }, [categoryInfo.id, categories]);

  if (!product) {
    return <p className="text-center">Loading product details...</p>;
  }

  return (
    <div className="single-product-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          {/* Sidebar Section */}
          <div className="col-md-4">
            <ProductList title="Recently Viewed" buttonOn={false} />
            <OtherBrands otherBrands={otherBrands} />
          </div>

          {/* Product Details Section */}
          <div className="col-md-8">
            <div className="product-content-right">
              <ProductBreadcrumb category={categoryInfo} product={product} />

              <div className="row">
                <div className="col-sm-6">
                  <ProductImages product={product} />
                </div>

                <div className="col-sm-6">
                  <ProductInfo product={product} />
                </div>
              </div>
            </div>                    
          </div>
        </div>
      </div>
    </div>
  );
}
