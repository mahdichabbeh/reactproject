import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux"; // Redux Provider
import store from "./Store/Store"; // Import Redux store
import RootLayout from "./Components/RootLayout";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import Cart from "./Components/Cart/Cart";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CheckoutForm from "./Components/Checkout/CheckoutForm";

import SearchResults from "./Components/Home/SearchResults";

// Define the router with children routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // The layout contains Header, Navbar, and Footer
    children: [
      { path: "", element: <Home /> }, // Home Page
      { path: "products-lists/:categoryId", element: <Shop /> }, // Shop Page
      { path: "product/:productId", element: <ProductDetails /> }, // Product Details
      { path: "carts/:cartId", element: <Cart /> }, // Cart Page
      { path: "checkout", element: <CheckoutForm /> },
      { path: "search", element: <SearchResults /> }, // Checkout Page
    ],
  },
]);



export default function App() {
  
  
  return (
    <Provider store={store}> {/* Provide Redux store */}
      <RouterProvider router={router} />
    </Provider>
  );
}
