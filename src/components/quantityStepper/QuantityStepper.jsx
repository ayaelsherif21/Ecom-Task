import "./QuantityStepper.css"
export default function QuantityStepper({
  qty,
  min = 0,
  onChange,
}) {
  return (
    <div className="review-stepper">

      <button
        className="review-stepper__btn"
        disabled={qty <= min}
        onClick={() => onChange(Math.max(min, qty - 1))}
      >
        −
      </button>

      <span className="review-stepper__value">
        {qty}
      </span>

      <button
        className="review-stepper__btn"
        onClick={() => onChange(qty + 1)}
      >
        +
      </button>

    </div>
  );
}