import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Carousel from "./Components/Carrousel.";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header/>
        <Navbar/>
        <Carousel/>
        
      </Router>

    </CartProvider>
    
  );
}

export default App;
