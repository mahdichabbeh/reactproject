import { productCategories } from "../../utils";
import ProductList from "../Tools/ProductList";

export default function ProductSection(){

    return (
        <div className="product-widget-area">
          <div className="zigzag-bottom"></div>
          <div className="container">
            <div className="row">
              {productCategories.map((category, index) => (
                <div className="col-md-4" >
                  <ProductList title={category.title} apiUrl={category.apiUrl} buttonOn />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

};