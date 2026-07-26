export default function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
}) {
  return (
    // <div className="variant-row" role="radiogroup" aria-label="Color">
    //   {variants.map((variant) => {
    //     const isActive = variant.id === activeVariantId;
    //     return (
    //       <button
    //         type="button"
    //         key={variant.id}
    //         className={`variant-chip${isActive ? " variant-chip--active" : ""}`}
    //         role="radio"
    //         aria-checked={isActive}
    //         onClick={() => onSelect(variant.id)}
    //       >
    //         {variant.colorImg && (
    //           <img
    //             src={variant.colorImg}
    //             alt={variant.label}
    //             className="variant-chip__image"
    //           />
    //         )}
    //         <span
    //           className="variant-chip__swatch"
    //           style={{ backgroundColor: variant.swatch }}
    //         />
    //         <span className="variant-chip__label">{variant.label}</span>
    //       </button>
    //     );
    //   })}
    // </div>
    <div className="variant-row" role="radiogroup" aria-label="Color">
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId;

        return (
          <button
            key={variant.id}
            type="button"
            className={`variant-chip ${isActive ? "variant-chip--active" : ""}`}
            onClick={() => onSelect(variant.id)}
          >
            <img
              src={variant.colorImg}
              alt={variant.label}
              className="variant-chip__image"
            />

            <span className="variant-chip__label">{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}
