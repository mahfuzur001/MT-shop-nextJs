"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import {
  formatOrderDate,
  formatStatusLabel,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  SHIPPING_STATUS_LABELS,
} from "../lib/orderStatus";

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    api
      .get("/api/orders/orders/")
      .then((res) => {
        const data = res.data.results || res.data;
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="page-container py-12 md:py-16">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            My <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Orders</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            View order and shipping status for all your purchases.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="glass-card p-12 text-center border border-white/5">
            <p className="text-slate-400 mb-6">You have not placed any orders yet.</p>
            <Link href="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="glass-card block p-5 md:p-6 border border-white/5 hover:border-violet-500/30 transition duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-white">Order #{order.id}</p>
                    <p className="text-xs text-slate-500 mt-1">{formatOrderDate(order.created_at)}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      {order.items?.reduce((sum, item) => sum + item.quantity, 0) || order.product_details?.length || order.products?.length || 0} item(s)
                      {order.shipping_city ? ` · ${order.shipping_city}` : ""}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <span className="status-pill status-pill--info">
                      {formatStatusLabel(ORDER_STATUS_LABELS, order.order_status)}
                    </span>
                    <span className="status-pill status-pill--purple">
                      {formatStatusLabel(SHIPPING_STATUS_LABELS, order.shipping_status)}
                    </span>
                    <span className="status-pill status-pill--success">
                      {formatStatusLabel(PAYMENT_STATUS_LABELS, order.payment_status)}
                    </span>
                  </div>

                  <p className="text-lg font-black text-white sm:text-right">
                    ${parseFloat(order.total_price).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
