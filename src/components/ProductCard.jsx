import { useStore } from "../context/StoreContext";
import ProductIcon from "./ProductIcon";
import VariantSelector from "./VariantSelector";
import QuantityStepper from "./QuantityStepper";
import { formatMoney } from "../utils/pricing";

export default function ProductCard({ product }) {
  const { quantities, activeVariants, setQuantity, setActiveVariant } =
    useStore();

  const activeVariantId = activeVariants[product.id];
  const activeVariant =
    product.variants.find((v) => v.id === activeVariantId) ||
    product.variants[0];
  const qty = quantities[activeVariantId] || 0;

  const totalSelected = product.variants.reduce(
    (sum, v) => sum + (quantities[v.id] || 0),
    0,
  );
  const isSelected = totalSelected > 0;

  const priceLabel =
    product.priceLabelOverride || formatMoney(activeVariant.price);

  return (
    <div
      className={`product-card${isSelected ? " product-card--selected" : ""}`}
    >
      {product.badge && (
        <span className="product-card__badge">{product.badge}</span>
      )}

      <div className="product-card__media">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <ProductIcon name={product.icon} />
        )}
      </div>
      
      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        {product.description && (
          <p className="product-card__desc">
            {product.description}
            {product.learnMore && (
              <>
                {" "}
                <a
                  className="product-card__link"
                  href="#learn-more"
                  onClick={(e) => e.preventDefault()}
                >
                  Learn More
                </a>
              </>
            )}
          </p>
        )}

        {product.isMultiVariant && (
          <VariantSelector
            variants={product.variants}
            activeVariantId={activeVariantId}
            onSelect={(variantId) => setActiveVariant(product.id, variantId)}
          />
        )}

        <div className="product-card__footer">
          <QuantityStepper
            qty={qty}
            min={product.minQuantity || 0}
            label={`${product.name}${activeVariant.label ? ` ${activeVariant.label}` : ""} quantity`}
            onChange={(next) => setQuantity(product.id, activeVariantId, next)}
          />

          <div className="product-card__price">
            {activeVariant.compareAtPrice != null && (
              <span className="price price--compare">
                {formatMoney(activeVariant.compareAtPrice)}
                {product.unit}
              </span>
            )}
            <span className="price price--active">
              {priceLabel}
              {priceLabel !== "FREE" ? product.unit : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
