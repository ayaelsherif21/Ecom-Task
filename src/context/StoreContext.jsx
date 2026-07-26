import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import rawData from "../data/products.json";
import {
  normalizeProducts,
  buildInitialQuantities,
  buildInitialActiveVariants,
} from "../utils/pricing";
import { loadSavedSystem, saveSystem, clearSavedSystem } from "../utils/storage";

const PRODUCTS = normalizeProducts(rawData.products);
const STEPS = rawData.steps;
const EXTRAS = rawData.extras;
const GUARANTEE = rawData.guarantee;
const FINANCING_LABEL = rawData.financingLabel;

const productById = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

function initialState() {
  return {
    activeStep: 1,
    quantities: buildInitialQuantities(PRODUCTS),
    activeVariants: buildInitialActiveVariants(PRODUCTS),
  };
}

function clampQuantity(product, qty) {
  const min = product.minQuantity || 0;
  return Math.max(min, qty);
}

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_STEP": {
      return { ...state, activeStep: action.payload.stepId };
    }
    case "SET_ACTIVE_VARIANT": {
      return {
        ...state,
        activeVariants: {
          ...state.activeVariants,
          [action.payload.productId]: action.payload.variantId,
        },
      };
    }
    case "SET_QUANTITY": {
      const { productId, variantId, qty } = action.payload;
      const product = productById[productId];
      const clamped = clampQuantity(product, qty);
      const nextQuantities = { ...state.quantities, [variantId]: clamped };

      // Plan-style products: only one option in the exclusive group can be
      // active at a time, mirroring a radio-button choice of plan.
      if (product.exclusiveGroup && clamped > 0) {
        PRODUCTS.filter(
          (p) => p.exclusiveGroup === product.exclusiveGroup && p.id !== productId
        ).forEach((p) => {
          p.variants.forEach((v) => {
            nextQuantities[v.id] = 0;
          });
        });
      }

      return { ...state, quantities: nextQuantities };
    }
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [savedAt, setSavedAt] = useState(() => {
    const saved = loadSavedSystem();
    return saved?.savedAt || null;
  });
  const [justSaved, setJustSaved] = useState(false);

  // Restore a previously-saved system on first load.
  useEffect(() => {
    const saved = loadSavedSystem();
    if (saved && saved.quantities) {
      dispatch({
        type: "HYDRATE",
        payload: {
          quantities: { ...state.quantities, ...saved.quantities },
          activeVariants: { ...state.activeVariants, ...saved.activeVariants },
          activeStep: saved.activeStep || 1,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setQuantity = (productId, variantId, qty) =>
    dispatch({ type: "SET_QUANTITY", payload: { productId, variantId, qty } });

  const setActiveVariant = (productId, variantId) =>
    dispatch({ type: "SET_ACTIVE_VARIANT", payload: { productId, variantId } });

  const setStep = (stepId) => dispatch({ type: "SET_STEP", payload: { stepId } });

  const saveForLater = () => {
    const timestamp = new Date().toISOString();
    saveSystem({ ...state, savedAt: timestamp });
    setSavedAt(timestamp);
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2200);
  };

  const resetSaved = () => {
    clearSavedSystem();
    setSavedAt(null);
  };

  const value = useMemo(
    () => ({
      products: PRODUCTS,
      steps: STEPS,
      extras: EXTRAS,
      guarantee: GUARANTEE,
      financingLabel: FINANCING_LABEL,
      activeStep: state.activeStep,
      quantities: state.quantities,
      activeVariants: state.activeVariants,
      setQuantity,
      setActiveVariant,
      setStep,
      saveForLater,
      resetSaved,
      savedAt,
      justSaved,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, savedAt, justSaved]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}
