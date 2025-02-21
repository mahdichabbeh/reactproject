import React from "react";
import Carousel from "./Carousel";
import PromoSection from "./PromoSection";
import BrandSection from "./BrandSection";
import ProductSection from "./ProductSection";
import { useDispatch } from "react-redux";
import { fetchProductsAndCategories } from "../../Slices/ProductSlice";
import { useEffect } from "react";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAndCategories()); // Fetch products once when app loads
  }, [dispatch]);
  
  return (
    <>
      <Carousel />
      <PromoSection/>
      <BrandSection/>
      <ProductSection/>
    </>
  );
};

export default Home;
