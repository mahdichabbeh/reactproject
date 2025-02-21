import { brands } from "../../utils";

export default function BrandSection() {
  return (
    <div className="brands-area">
      <div className="zigzag-bottom" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="brand-wrapper">
              <div className="brand-list">
                {brands.map((brand, index) => (
                  <img src={brand} alt={`Brand ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
