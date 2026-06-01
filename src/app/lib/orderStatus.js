export const ORDER_STATUS_LABELS = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PAYMENT_STATUS_LABELS = {
  pending: "Pending",
  completed: "Completed",
  failed: "Failed",
};

export const SHIPPING_STATUS_LABELS = {
  pending: "Awaiting Packing",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  returned: "Returned",
};

export const ORDER_STATUS_STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

export const SHIPPING_STATUS_STEPS = [
  { key: "pending", label: "Pending" },
  { key: "packed", label: "Packed" },
  { key: "shipped", label: "In Transit" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export function getStepIndex(steps, currentKey) {
  const idx = steps.findIndex((s) => s.key === currentKey);
  return idx === -1 ? 0 : idx;
}

export function formatStatusLabel(map, value) {
  return map[value] || value?.replace(/_/g, " ") || "Unknown";
}

export function formatOrderDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatShippingAddress(order) {
  if (!order?.shipping_address_line1) return null;
  const lines = [
    order.shipping_full_name,
    order.shipping_address_line1,
    order.shipping_address_line2,
    [order.shipping_city, order.shipping_state, order.shipping_postal_code]
      .filter(Boolean)
      .join(", "),
    order.shipping_country,
    order.shipping_phone ? `Phone: ${order.shipping_phone}` : null,
  ].filter(Boolean);
  return lines;
}
