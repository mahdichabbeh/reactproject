import { promoItems } from "../../utils/index";
import PromoCard from "../Tools/PromoCard";

export default function PromoSection() {
    return(
    <div className="promo-area">
      <div className="zigzag-bottom">
        <div className="container">
          <div className="row">
            {promoItems.map((promo, index) => (
              <PromoCard key={index} {...promo} />
            ))}
          </div>
        </div>
      </div>
    </div>);
  };