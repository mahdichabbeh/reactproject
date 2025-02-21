import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet /> 
      <Footer />
    </>
  );
}
