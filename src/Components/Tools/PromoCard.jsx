export default function PromoCard({ text, divClass, iClass }) {
    return (
      <div className="col-md-3 col-sm-6">
        <div className={`single-promo ${divClass}`}>
          <i className={`fa ${iClass}`} />
          <p>{text}</p>
        </div>
      </div>
    );
  }
  