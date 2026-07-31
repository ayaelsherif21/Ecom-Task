# Wyze-style Bundle Builder

A two-column bundle builder built with React + Vite: a 4-step accordion on the
left (cameras → plan → sensors → protection) and a live "Your security
system" review panel on the right, per the provided Figma screenshots.

## Run it

Requires Node 18+.

```bash
npm install
npm run dev       # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build to /dist
npm run preview    # serve the production build locally
npm run lint        # oxlint
```

No backend is required — everything is driven by the JSON file at
`src/data/products.json`.

## How it's built

- **Data-driven**: `src/data/products.json` defines the 4 steps and every
  product (badge, description, "Learn More" flag, variants, pricing, initial
  quantities). `src/utils/pricing.js` normalizes that JSON — a product with no
  color options becomes a single "implicit" variant, so the rest of the app
  never branches on "has variants vs. doesn't."
- - **State**: `src/context/StoreContext.js` defines the context,
  `StoreProvider.jsx` manages the reducer and state,
  and `useStore.js` exposes the custom hook used throughout the app.
  (`quantities` keyed by variant id, `activeVariants` keyed by product id,
  `activeStep`) in a `useReducer`, exposed via a `useStore()` hook. Nothing is
  hardcoded per-product; `ProductCard`, `ReviewLineItem`, `VariantSelector`,
  and `QuantityStepper` all just render whatever the data says.
- **Variant quantity behavior**: each variant has its own quantity in state.
  Switching the active color on a card only changes which variant's count the
  stepper is bound to — it doesn't touch other variants' counts. The review
  panel independently lists every variant (across every product) with
  qty > 0, so e.g. Red ×2 and Blue ×1 of the same product show as two lines.
- **"N selected"**: computed per step as the number of *distinct products*
  (not variants) in that step with a total quantity > 0.
- **Persistence**: "Save my system for later" writes `{ quantities,
  activeVariants, activeStep, savedAt }` to `localStorage`. On load, the app
  seeds its normal initial state from the JSON and then merges in any saved
  state on top, so a fresh visitor sees the default demo bundle and a
  returning one sees exactly what they left.
- **Pricing**: all totals are derived, not stored — `computeTotals` sums
  `price * qty` and `(compareAtPrice ?? price) * qty` across every selected
  line and diffs them for the savings callout. I back-solved the seed
  quantities/prices in the JSON so the initial render reproduces the exact
  numbers in the design ($187.89 total / $238.81 struck / $50.92 saved).

## Decisions & tradeoffs

- **Product imagery**: I didn't have access to real Wyze product photography
  (and wouldn't want to just lift screenshots), so each product renders a
  small original SVG icon (`ProductIcon.jsx`) instead of a photo. Swapping in
  real images later is just a matter of pointing the card at an `<img>` src
  from the JSON.
- **Steps 2–4 product cards**: the provided screenshots only show Step 1
  ("Choose your cameras") expanded — the plan/sensors/protection steps are
  shown collapsed, with only their *review panel results* visible. I
  designed plausible cards for those steps (Cam Unlimited/Basic plans, a
  couple of extra sensors, a protection plan) using the same card patterns
  as Step 1, and made sure the *default* selections in those steps
  reproduce the exact review-panel numbers from the design. If the real
  Figma for those steps differs, only `products.json` needs updating — no
  component changes.
- **Plan step behavior**: I treated the two plan options as mutually
  exclusive (selecting one zeroes the other), since "Cam Unlimited" and "Cam
  Basic" represent one subscription choice rather than independent
  add-to-cart items. This is implemented generically via an
  `exclusiveGroup` field on the product, not a special case in the reducer.
- **Fast Shipping**: shown in the review panel as a fixed, always-included,
  non-editable line (as the design shows it with no stepper), sourced from
  an `extras` array in the JSON rather than the main product list.
- **Responsiveness**: Frame 1735 (review panel beside the builder, 2 cards per
  row) is the confirmed desktop design, and Frame 1736 (review panel below,
  wider single column) is the breakpoint just under it. I matched both
  precisely from the Figma inspector values you shared:
  - **>= 1180px** ("Frame 1735"): two-column grid, accordion column 768fr /
    review column 399fr with a 29px gap; product cards are the fixed
    361.5×159px horizontal layout (image left, text/controls column right);
    the step's light-blue content box is `#EDF4FF`, 10px radius, 15px padding,
    5px gap; the review panel is 10px radius / 15px top padding, each category
    group has a 1px top divider, 15px top padding, and an 8px internal gap.
  - **560–1179px** ("Frame 1736" reflow): review panel drops below the
    builder (full width), and product cards switch to the fixed vertical
    224.6×331.1px layout (image on top), wrapping naturally — 5 per row at
    the full ~1213px width, fewer as the viewport narrows.
  - **< 560px**: not specced in Figma, so I relaxed to a simple fluid,
    single-column mobile layout per the brief ("smaller viewports are
    supposed to be responsive design").
  Because the product card is just a fixed-size flex item that wraps, the
  5-across vs 2-across reflow between the two named frames happens for free
  from the same CSS — no separate mobile/desktop component branches.
- **Guarantee badge**: the "100%" starburst badge is approximated as a
  circle with a dashed ring rather than a pixel-accurate star shape.
- **Checkout**: no real checkout flow exists — the button flips to a
  "Order placed — thank you!" confirmation for a couple of seconds, per the
  prompt's note that a placeholder is fine.
- **Not finished / would do next with more time**: hover/focus states for
  color swatches beyond the basic active outline, a true starburst guarantee
  badge, unit tests around the reducer and pricing utils, and an actual
  backend for the product catalog (a JSON file is used, as the brief allows).

## Project structure

```
src/
  data/products.json       - steps, products, extras (the single source of truth)
context/
  StoreContext.js     - React context
  StoreProvider.jsx   - reducer, state management, localStorage sync
  useStore.js         - custom hook
  utils/pricing.js         - JSON normalization, totals, "N selected" math
  utils/storage.js         - localStorage read/write/clear
 components/
  productCard/
    ProductCard.jsx
  quantityStepper/
    QuantityStepper.jsx
  reviewPanel/
    ReviewPanel.jsx
    ReviewLineItem.jsx
  step/
    Accordion.jsx
    Step.jsx
    StepIcon.jsx
  variantSelector/
    VariantSelector.jsx
```
