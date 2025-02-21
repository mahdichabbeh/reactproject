import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAndCategories } from "../../Slices/ProductSlice"; // ✅ Import Redux action
import ProductCard from "../Tools/ProductCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const dispatch = useDispatch();

  // ✅ Select products from Redux state
  const { items: products, loading } = useSelector((state) => state.products);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // ✅ Fetch products & categories if not loaded
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductsAndCategories());
    }
  }, [dispatch, products.length]);

  // ✅ Debounce search query (300ms delay)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  // ✅ Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!debouncedQuery || loading) return [];
    return products.flatMap((list) =>
      list.items.filter((product) =>
        product.name.toLowerCase().includes(debouncedQuery)
      )
    );
  }, [debouncedQuery, products, loading]);

  return (
    <div className="container">
      <h2>Search Results for "{query}"</h2>
      <ul className="row">
        {loading ? (
          <p>Loading...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ul>
    </div>
  );
}
