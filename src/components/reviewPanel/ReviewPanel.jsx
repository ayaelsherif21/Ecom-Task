import { useState } from "react";
import { getLineItems, computeTotals, formatMoney } from "../../utils/pricing";
import ReviewLineItem from "./ReviewLineItem";
import './ReviewPanel.css';
import ProductIcon from "../step/StepIcon";
import { useStore } from "../../context/useStore";

const CATEGORY_ORDER = [
  "cameras",
  "sensors",
  "accessories",
  "protection",
  "plan",
];

export default function ReviewPanel() {
  const {
    products,
    quantities,
    setQuantity,
    extras,
    guarantee,
    financingLabel,
    saveForLater,
    justSaved,
  } = useStore();
  const [confirming, setConfirming] = useState(false);

  const lineItems = getLineItems(products, quantities);
  const { saleTotal, compareTotal, savings } = computeTotals(lineItems);

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    label: lineItems.find((i) => i.category === category)?.categoryLabel,
    items: lineItems.filter((i) => i.category === category),
  })).filter((group) => group.items.length > 0);

  const handleCheckout = () => {
    setConfirming(true);
    window.setTimeout(() => setConfirming(false), 2400);
  };

  return (
    <aside className="review-panel">
      <div className="review-panel__header-box">
        <span className="review-header">REVIEW</span>
        <h2 className="review-panel__title">Your security system</h2>
        <p className="review-panel__subtitle">
          Review your personalized protection system designed to keep what matters
          most safe.
        </p>
      </div>

      <div className="review-panel__content">
        {grouped.map((group) => (
          <div className="review-group" key={group.category}>
            <h3 className="review-group__label">{group.label}</h3>
            {group.items.map((item) => (
              <ReviewLineItem
                key={item.variantId}
                item={item}
                onChangeQty={(next) =>
                  setQuantity(item.productId, item.variantId, next)
                }
              />
            ))}
          </div>
        ))}

        {extras.length > 0 && (
          <div className="review-group">
            {extras.map((extra) => (
              <div className="review-line review-line--extra" key={extra.id}>
                <div className="review-line__thumb">
                  <ProductIcon name={extra.icon} />
                </div>
                <div className="review-line__info">
                  <span className="review-line__name">{extra.name}</span>
                </div>
                <div className="review-line__price">
                  <span className="price price--compare price--small">
                    {formatMoney(extra.compareAtPrice)}
                  </span>
                  <span
                    className="price price--active price--small"
                    style={{ color: "#4E2FD2" }}
                  >
                    {extra.priceLabelOverride}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="review-panel__checkout-block">
        <div className="review-summary">
          <div className="review-summary__badge">
            <img
              src={guarantee.image}
              alt="100% Wyze satisfaction guarantee"
              className="guarantee-badge"
            />
            <div className="tablet-only-text">
              <h4>30-day hassle-free returns</h4>
              <p>
                If you're not totally in love with the product, we will refund
                you 100%.
              </p>
            </div>
          </div>

          <div className="review-summary__prices">
            <div className="review-panel__financing">
              as low as {financingLabel}
            </div>

            <div className="review-panel__totals">
              {compareTotal > saleTotal && (
                <span className="price price--compare price--total">
                  {formatMoney(compareTotal)}
                </span>
              )}

              <span className="price price--active price--total">
                {formatMoney(saleTotal)}
              </span>
            </div>
          </div>
        </div>

        {savings > 0 && (
          <p className="review-panel__savings">
            Congrats! You're saving {formatMoney(savings)} on your security
            bundle!
          </p>
        )}

        <button
          type="button"
          className="btn btn--checkout"
          onClick={handleCheckout}
        >
          {confirming ? "Order placed — thank you!" : "Checkout"}
        </button>

        <button
          type="button"
          className="link link--save"
          onClick={saveForLater}
        >
          {justSaved ? "Saved!" : "Save my system for later"}
        </button>
      </div>
    </aside>
  );
}