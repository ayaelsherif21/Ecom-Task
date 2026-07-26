import QuantityStepper from "./QuantityStepper";
import { formatMoney } from "../utils/pricing";

export default function ReviewLineItem({ item, onChangeQty }) {
  const lineCompare =
    item.compareAtPrice != null ? item.compareAtPrice * item.qty : null;

  const lineSale =
    item.priceLabelOverride || formatMoney(item.price * item.qty);

  return (
    <div className="review-line">

      <div className="review-line__thumb">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
          />
        ) : (
          <div className="review-line__placeholder" />
        )}
      </div>

      <div className="review-line__name">
        {item.name}
      </div>

      <QuantityStepper
        size="sm"
        qty={item.qty}
        min={item.minQuantity || 0}
        onChange={onChangeQty}
      />

      <div className="review-line__price">
        {lineCompare && (
          <span className="price price--compare">
            {formatMoney(lineCompare)}
          </span>
        )}

        <span className="price price--active">
          {lineSale}
          {item.unit}
        </span>
      </div>

    </div>
  );
}
// import ProductIcon from "./ProductIcon";
// import QuantityStepper from "./QuantityStepper";
// import { formatMoney } from "../utils/pricing";

// export default function ReviewLineItem({ item, onChangeQty }) {
//   const lineCompare =
//     item.compareAtPrice != null ? item.compareAtPrice * item.qty : null;
//   const lineSale = item.priceLabelOverride || formatMoney(item.price * item.qty);

//   return (
//     <div className="review-line">
//       <div className="review-line__thumb">
//         <ProductIcon name={item.icon} />
//       </div>

//       <div className="review-line__info">
//         <span className="review-line__name">
//           {item.name}
//           {item.variantLabel ? ` (${item.variantLabel})` : ""}
//         </span>
//         <QuantityStepper
//           size="sm"
//           qty={item.qty}
//           min={item.minQuantity || 0}
//           label={`${item.name} quantity`}
//           onChange={onChangeQty}
//         />
//       </div>

//       <div className="review-line__price">
//         {lineCompare != null && (
//           <span className="price price--compare price--small">
//             {formatMoney(lineCompare)}
//           </span>
//         )}
//         <span className="price price--active price--small" style={{ color: "#4E2FD2" , fontWeight: "400" , fontSize: "14px"}}>
//           {lineSale}
//           {item.unit}
//         </span>
//       </div>
//     </div>
//   );
// }
