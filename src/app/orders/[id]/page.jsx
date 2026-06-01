"use client";
import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "../../lib/api";
import { useAuth } from "../../lib/AuthContext";
import {
  formatOrderDate,
  formatShippingAddress,
  formatStatusLabel,
  getStepIndex,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_STEPS,
  PAYMENT_STATUS_LABELS,
  SHIPPING_STATUS_LABELS,
  SHIPPING_STATUS_STEPS,
} from "../../lib/orderStatus";

function StatusTimeline({ steps, currentKey, variant = "violet" }) {
  const activeIdx = getStepIndex(steps, currentKey);

  return (
    <div className="order-timeline">
      {steps.map((step, idx) => {
        const isDone = idx <= activeIdx;
        const isCurrent = idx === activeIdx;
        return (
          <div
            key={step.key}
            className={`order-timeline-step ${isDone ? "order-timeline-step--done" : ""} ${isCurrent ? "order-timeline-step--current" : ""} order-timeline-step--${variant}`}
          >
            <div className="order-timeline-dot" />
            <div className="order-timeline-content">
              <p className="order-timeline-label">{step.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function OrderDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (!id) return;

    api
      .get(`/api/orders/orders/${id}/`)
      .then((res) => setOrder(res.data))
      .catch(() => router.push("/orders"))
      .finally(() => setLoading(false));
  }, [id, user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) return null;

  const addressLines = formatShippingAddress(order);
  const items = order.items || [];
  const products = order.product_details || [];

  return (
    <div className="page-container py-12 md:py-16">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <div>
          <Link href="/orders" className="text-sm text-slate-400 hover:text-white transition">
            All Orders
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-white mt-4 tracking-tight">
            Order <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">#{order.id}</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">Placed on {formatOrderDate(order.created_at)}</p>
        </div>

        {/* Status badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-5 border border-white/5">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Payment</p>
            <span className="status-pill status-pill--success">
              {formatStatusLabel(PAYMENT_STATUS_LABELS, order.payment_status)}
            </span>
          </div>
          <div className="glass-card p-5 border border-white/5">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Order Status</p>
            <span className="status-pill status-pill--info">
              {formatStatusLabel(ORDER_STATUS_LABELS, order.order_status)}
            </span>
          </div>
          <div className="glass-card p-5 border border-white/5">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Shipping Status</p>
            <span className="status-pill status-pill--purple">
              {formatStatusLabel(SHIPPING_STATUS_LABELS, order.shipping_status)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order progress */}
          <div className="glass-card p-6 md:p-8 border border-white/5 space-y-6">
            <h2 className="text-lg font-bold text-white">Order Progress</h2>
            <StatusTimeline steps={ORDER_STATUS_STEPS} currentKey={order.order_status} variant="cyan" />

            <h2 className="text-lg font-bold text-white pt-4 border-t border-white/5">Shipping Progress</h2>
            <StatusTimeline steps={SHIPPING_STATUS_STEPS} currentKey={order.shipping_status} variant="violet" />

            {order.tracking_number && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-white/5">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Tracking Number</p>
                <p className="text-sm font-mono text-cyan-400 mt-1">{order.tracking_number}</p>
              </div>
            )}
          </div>

          {/* Shipping address */}
          <div className="space-y-6">
            <div className="glass-card p-6 md:p-8 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4">Shipping Address</h2>
              {addressLines ? (
                <address className="not-italic text-sm text-slate-400 leading-relaxed space-y-1">
                  {addressLines.map((line, i) => (
                    <p key={i} className={i === 0 ? "text-white font-semibold" : ""}>{line}</p>
                  ))}
                </address>
              ) : (
                <p className="text-sm text-slate-500">No address saved for this order.</p>
              )}
            </div>

            <div className="glass-card p-6 md:p-8 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4">Payment Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Items + Shipping</span>
                  <span className="text-white font-semibold">
                    ${(parseFloat(order.total_price) - parseFloat(order.shipping_cost || 0)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping Cost</span>
                  <span className="text-white font-semibold">
                    ${parseFloat(order.shipping_cost || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-3 border-t border-white/5">
                  <span>Total Paid</span>
                  <span>${parseFloat(order.total_price).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="glass-card p-6 md:p-8 border border-white/5">
          <h2 className="text-lg font-bold text-white mb-5">Items in this Order</h2>
          <div className="space-y-4">
            {(items.length > 0 ? items : products).map((entry) => {
              const prod = entry.product_details || entry;
              const quantity = entry.quantity || 1;
              const unitPrice = entry.unit_price || (prod.discount_price && prod.price > prod.discount_price ? prod.discount_price : prod.price);

              return (
              <div key={`${prod.id}-${entry.id || 'product'}`} className="flex items-center gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                <div className="relative w-16 h-16 bg-white/5 rounded-xl flex-shrink-0">
                  <Image
                    src={prod.image || "/product.png"}
                    alt={prod.name}
                    fill
                    className="object-contain p-2"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${prod.id}`} className="text-sm font-bold text-white hover:text-violet-400">
                    {entry.product_name || prod.name}
                  </Link>
                  <p className="text-xs text-slate-500 capitalize mt-0.5">
                    {prod.category} {quantity > 1 ? `- Qty: ${quantity}` : ""}
                  </p>
                </div>
                <span className="text-sm font-bold text-white">
                  ${parseFloat(unitPrice).toFixed(2)}
                </span>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
