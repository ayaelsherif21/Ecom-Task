// export default function QuantityStepper({ qty, min = 0, onChange, size = "md", label }) {
//   const decDisabled = qty <= min;

//   return (
//     <div className={`stepper stepper--${size}`} role="group" aria-label={label || "Quantity"}>
//       <button
//         type="button"
//         className="stepper__btn"
//         disabled={decDisabled}
//         onClick={() => onChange(Math.max(min, qty - 1))}
//         aria-label="Decrease quantity"
//       >
//         &minus;
//       </button>
//       <span className="stepper__value">{qty}</span>
//       <button
//         type="button"
//         className="stepper__btn"
//         onClick={() => onChange(qty + 1)}
//         aria-label="Increase quantity"
//       >
//         +
//       </button>
//     </div>
//   );
// }

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