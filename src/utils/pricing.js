// Normalizes the raw product JSON into a flat list of "variants" so the rest
// of the app never has to special-case "has variants" vs "doesn't have variants".
// A product with no color options becomes a single implicit variant whose id
// equals the product id.
export function normalizeProducts(rawProducts) {
  return rawProducts.map((product) => {
    if (product.variants && product.variants.length) {
      return {
        ...product,
        variants: product.variants,
        isMultiVariant: true,
      };
    }
    const implicitVariant = {
      id: product.id,
      label: null,
      swatch: null,
      compareAtPrice: product.noVariantPricing?.compareAtPrice ?? null,
      price: product.noVariantPricing?.price ?? 0,
    };
    return {
      ...product,
      variants: [implicitVariant],
      isMultiVariant: false,
    };
  });
}

export function buildInitialQuantities(products) {
  const quantities = {};
  products.forEach((product) => {
    product.variants.forEach((variant) => {
      const key = product.isMultiVariant ? variant.id : "default";
      quantities[variant.id] = product.initialQuantities?.[key] ?? 0;
    });
  });
  return quantities;
}

export function buildInitialActiveVariants(products) {
  const active = {};
  products.forEach((product) => {
    active[product.id] = product.isMultiVariant
      ? product.initialActiveVariant
      : product.variants[0].id;
  });
  return active;
}

export function formatMoney(value) {
  if (value === null || value === undefined) return "";
  return `$${value.toFixed(2)}`;
}

// Returns every variant (across every product) that currently has qty > 0,
// enriched with its parent product's display info.
export function getLineItems(products, quantities) {
  const items = [];
  products.forEach((product) => {
    product.variants.forEach((variant) => {
      const qty = quantities[variant.id] || 0;
      if (qty > 0) {
        items.push({
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          variantLabel: variant.label,
          image: product.image,
          icon: product.icon,
          category: product.category,
          categoryLabel: product.categoryLabel,
          unit: product.unit || "",
          qty,
          price: variant.price,
          compareAtPrice: variant.compareAtPrice,
          priceLabelOverride: product.priceLabelOverride || null,
          minQuantity: product.minQuantity || 0,
          step: product.step,
        });
      }
    });
  });
  return items;
}

// Number of distinct products (not variants) with at least one unit selected
// within a given step - powers the "N selected" chip in each accordion header.
export function countSelectedForStep(products, quantities, stepId) {
  let count = 0;
  products
    .filter((p) => p.step === stepId)
    .forEach((product) => {
      const total = product.variants.reduce(
        (sum, v) => sum + (quantities[v.id] || 0),
        0
      );
      if (total > 0) count += 1;
    });
  return count;
}

export function computeTotals(lineItems) {
  let saleTotal = 0;
  let compareTotal = 0;
  lineItems.forEach((item) => {
    saleTotal += item.price * item.qty;
    const compareUnit = item.compareAtPrice ?? item.price;
    compareTotal += compareUnit * item.qty;
  });
  return {
    saleTotal,
    compareTotal,
    savings: Math.max(compareTotal - saleTotal, 0),
  };
}
