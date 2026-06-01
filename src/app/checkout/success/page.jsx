"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api";
import { useAuth } from "../../lib/AuthContext";
import {
  formatStatusLabel,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  SHIPPING_STATUS_LABELS,
} from "../../lib/orderStatus";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (!orderId) {
      router.push("/cart");
      return;
    }

    api
      .get(`/api/orders/orders/${orderId}/`)
      .then((res) => setOrder(res.data))
      .catch(() => router.push("/orders"))
      .finally(() => setLoading(false));
  }, [user, authLoading, orderId, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="page-container py-12 md:py-16">
      <div className="max-w-lg mx-auto">
        <div className="glass-card p-10 md:p-14 text-center border border-white/5 space-y-6 shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto border border-emerald-500/20">
            OK
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white">Order Confirmed!</h1>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Thank you! Your order <span className="text-violet-400 font-semibold">#{order?.id}</span> has been placed successfully.
            </p>
          </div>

          {order && (
            <div className="space-y-3 text-left">
              <div className="status-pill-row">
                <span>Payment</span>
                <strong className="status-pill status-pill--success">
                  {formatStatusLabel(PAYMENT_STATUS_LABELS, order.payment_status)}
                </strong>
              </div>
              <div className="status-pill-row">
                <span>Order Status</span>
                <strong className="status-pill status-pill--info">
                  {formatStatusLabel(ORDER_STATUS_LABELS, order.order_status)}
                </strong>
              </div>
              <div className="status-pill-row">
                <span>Shipping</span>
                <strong className="status-pill status-pill--purple">
                  {formatStatusLabel(SHIPPING_STATUS_LABELS, order.shipping_status)}
                </strong>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href={`/orders/${orderId}`} className="btn-primary flex-1 text-center">
              Track Order
            </Link>
            <Link href="/products" className="btn-outline flex-1 text-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
