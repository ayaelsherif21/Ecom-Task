import ProductCard from "../productCard/ProductCard";
import { useStore } from "../../context/useStore";
import { countSelectedForStep } from "../../utils/pricing";
import "./Step.css"
import ProductIcon from "./StepIcon";
export default function Step({ step, isOpen, onToggle }) {
  const { products, quantities, setStep, steps } = useStore();
  const stepProducts = products.filter((p) => p.step === step.id);
  const selectedCount = countSelectedForStep(products, quantities, step.id);

  const handleNext = () => {
    const currentIndex = steps.findIndex((s) => s.id === step.id);
    const next = steps[currentIndex + 1];
    if (next) setStep(next.id);
  };

  return (
    <section className={`step${isOpen ? " step--open" : ""}`}>
    <button
  type="button"
  className="step__header"
  onClick={onToggle}
  aria-expanded={isOpen}
>
  <div className="step__eyebrow-container">
    <span className={`step__eyebrow${isOpen ? " step__eyebrow--open" : ""}`}>
      STEP {step.id} OF {steps.length}
    </span>
  </div>

  <span className="step__divider" aria-hidden="true" />

  <div className="step__title-row">
    <div className="step__title-group">
      <span className="step__icon">
        <ProductIcon name={step.icon} />
      </span>
      <span className="step__title">{step.title}</span>
    </div>

    <div className="step__state">
      <span className="step__count">{selectedCount} selected</span>
      <span className={`step__chevron${isOpen ? " step__chevron--up" : ""}`}>
        ▾
      </span>
    </div>
  </div>
</button>

      {isOpen && (
        <div className="step__body">
          <div className="product-grid">
            {stepProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {step.nextLabel && (
            <button type="button" className="btn btn--next" onClick={handleNext}>
              {step.nextLabel}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
