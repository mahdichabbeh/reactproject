import logo from "../img/logo.png"
import { Link } from "react-router-dom";
import React, { useContext , useEffect} from "react";
import { CartContext } from "../context/CartContext";

export default function Header(){

    const {cart} = useContext(CartContext);
    return(
        <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="logo" style={{width: "100px", height: "100px"}}>
                            <h1><Link to="/"><img src={logo} alt="logo" /></Link></h1>
                        </div>
                    </div>
                    <div className="col-sm-4">
                            <input type="text" style={{marginTop: "30px"}} placeholder="Search products..." />
                            <input type="button" value="Search"/>
                   </div>
                    <div className="col-sm-4">
                        <div className="shopping-item">
                        <Link href="cart.html" >Cart : €<span className="cart-amunt">{cart.totalAmount.toFixed(2)}</span> <i className="fa fa-shopping-cart"></i> <span className="product-count">{cart.itemCount}</span></Link>
                        </div>
                    </div>
                </div>
        </div>
    );
}