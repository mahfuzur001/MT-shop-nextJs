/** Maximum quantity per product in cart / per order */
export const MAX_CART_QUANTITY = 5;

/** Highest quantity allowed for one line item (capped by stock). */
export function getMaxAllowedQuantity(stock) {
  const available = typeof stock === "number" ? stock : 99;
  return Math.min(MAX_CART_QUANTITY, Math.max(0, available));
}

export function clampQuantity(quantity, stock) {
  const max = getMaxAllowedQuantity(stock);
  return Math.min(Math.max(1, quantity), max);
}
