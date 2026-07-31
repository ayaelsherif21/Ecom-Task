import QuantityStepper from "../quantityStepper/QuantityStepper";
import { formatMoney } from "../../utils/pricing";
import "./ReviewPanel.css";
import "./ReviewLineItem.css";
import ProductIcon from "../step/StepIcon";
export default function ReviewLineItem({ item, onChangeQty }) {
  const lineCompare =
    item.compareAtPrice != null ? item.compareAtPrice * item.qty : null;

  const lineSale =
    item.priceLabelOverride || formatMoney(item.price * item.qty);
  const isPlan = item.category === "plan";

  return (
    <div className={`review-line ${isPlan ? "review-line--plan" : ""}`}>
      <div className="review-line__thumb">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : item.icon ? (
          <ProductIcon name={item.icon} className="review-line__icon" />
        ) : (
          <div className="review-line__placeholder" />
        )}
      </div>

      <div className="review-line__name">
        {item.name === "Cam Unlimited" ? (
          <>
            <span>Cam </span>
            <span className="review-line__name--highlight">Unlimited</span>
          </>
        ) : (
          item.name
        )}
      </div>

      {!isPlan ? (
        <QuantityStepper
          size="sm"
          qty={item.qty}
          min={item.minQuantity || 0}
          onChange={onChangeQty}
        />
      ) : (
        <div />
      )}

      <div className="review-line__price">
        {lineCompare && (
          <span className="price price--compare">
            {formatMoney(lineCompare)}
             {item.unit}
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
