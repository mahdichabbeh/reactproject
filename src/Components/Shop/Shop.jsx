import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Tools/ProductCard";
import Pagination from "./Pagination";
import { fetchProductsAndCategories } from "../../Slices/ProductSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Shop() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { items: productLists, categories, loading } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (productLists.length === 0 || categories.length === 0) {
      dispatch(fetchProductsAndCategories());
    }
  }, [dispatch, productLists.length, categories.length]);

  const categoryData = useMemo(() => {
    const category = categories.find((categ) => categ.id === categoryId);
    if (!category) return { name: "", items: [] };

    const categoryProducts = productLists.find(
      (list) => list.id === category.productListId
    )?.items || [];

    return { name: category.name, items: categoryProducts };
  }, [categoryId, categories, productLists]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categoryData.items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categoryData.items.length / itemsPerPage);

  return (
    <div>
      {/* Title Section */}
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>{categoryData.name}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="single-product-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : currentItems.length > 0 ? (
              currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center">No products found.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
