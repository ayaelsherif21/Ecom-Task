import QuantityStepper from "../quantityStepper/QuantityStepper";
import { formatMoney } from "../../utils/pricing";
import './ReviewPanel.css'
import './ReviewLineItem.css'
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