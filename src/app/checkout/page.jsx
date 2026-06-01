"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "../lib/api";
import { useAuth } from "../lib/AuthContext";

const EMPTY_ADDRESS = {
  shipping_full_name: "",
  shipping_phone: "",
  shipping_email: "",
  shipping_address_line1: "",
  shipping_address_line2: "",
  shipping_city: "",
  shipping_state: "",
  shipping_postal_code: "",
  shipping_country: "Bangladesh",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState(EMPTY_ADDRESS);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    setAddress((prev) => ({
      ...prev,
      shipping_full_name: user.username || "",
      shipping_email: user.email || "",
    }));

    api
      .get("/api/cart/cart/")
      .then((res) => {
        const items = Array.isArray(res.data) ? res.data : res.data.results || [];
        setCartItems(items);
        if (items.length === 0) router.push("/cart");
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  const subtotal = cartItems.reduce((sum, item) => {
    const prod = item.product_details;
    if (!prod) return sum;
    const price =
      prod.discount_price && prod.price > prod.discount_price
        ? prod.discount_price
        : prod.price;
    return sum + parseFloat(price) * item.quantity;
  }, 0);

  const shipping = subtotal > 150 ? 0 : subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + shipping;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const orderResponse = await api.post("/api/orders/orders/", {
        ...address,
      });

      const createdOrder = orderResponse.data;

      await api.post("/api/payments/", {
        order: createdOrder.id,
        amount: createdOrder.total_price,
        method: "card",
        status: "completed",
        transaction_id: `TXN-${Date.now()}`,
      });

      router.push(`/checkout/success?orderId=${createdOrder.id}`);
    } catch (err) {
      console.error("Checkout failed:", err);
      const msg =
        err.response?.data?.shipping_address?.[0] ||
        err.response?.data?.detail ||
        "Could not place order. Please check your address and try again.";
      setError(typeof msg === "string" ? msg : "Checkout failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="page-container py-12 md:py-16">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        <div>
          <Link href="/cart" className="text-sm text-slate-400 hover:text-white transition">
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-white mt-4 tracking-tight">
            Shipping <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Address</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Enter where we should deliver your order.
          </p>
        </div>

        {error && (
          <div className="glass-card border border-rose-500/30 bg-rose-500/10 text-rose-300 px-5 py-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <form onSubmit={handlePlaceOrder} className="lg:col-span-2 glass-card p-6 md:p-8 border border-white/5 space-y-5">
            <h2 className="text-lg font-bold text-white pb-2 border-b border-white/5">
              Delivery Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  name="shipping_full_name"
                  required
                  value={address.shipping_full_name}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Phone *
                </label>
                <input
                  name="shipping_phone"
                  required
                  value={address.shipping_phone}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="+880 1712 345678"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  name="shipping_email"
                  value={address.shipping_email}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Street Address *
                </label>
                <input
                  name="shipping_address_line1"
                  required
                  value={address.shipping_address_line1}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="House / Road / Area"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Apartment, Suite (optional)
                </label>
                <input
                  name="shipping_address_line2"
                  value={address.shipping_address_line2}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="Apt 4B, Floor 2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  City *
                </label>
                <input
                  name="shipping_city"
                  required
                  value={address.shipping_city}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="Chattogram"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  State / Division
                </label>
                <input
                  name="shipping_state"
                  value={address.shipping_state}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="Chattogram"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Postal Code *
                </label>
                <input
                  name="shipping_postal_code"
                  required
                  value={address.shipping_postal_code}
                  onChange={handleChange}
                  className="input-glass"
                  placeholder="4000"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Country
                </label>
                <input
                  name="shipping_country"
                  value={address.shipping_country}
                  onChange={handleChange}
                  className="input-glass"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary !py-3.5 mt-4 disabled:opacity-50"
            >
              {submitting ? "Placing Order..." : "Confirm & Place Order"}
            </button>
          </form>

          <div className="glass-card p-6 md:p-8 border border-white/5 space-y-5 lg:sticky lg:top-24">
            <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cartItems.map((item) => {
                const prod = item.product_details;
                if (!prod) return null;
                const price =
                  prod.discount_price && prod.price > prod.discount_price
                    ? prod.discount_price
                    : prod.price;
                return (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 bg-white/5 rounded-lg flex-shrink-0">
                      <Image
                        src={prod.image || "/product.png"}
                        alt={prod.name}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white line-clamp-1">{prod.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-white">
                      ${(parseFloat(price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 text-sm border-t border-white/5 pt-4">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-white font-semibold">
                  {shipping === 0 ? (
                    <span className="text-emerald-400">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/5">
                <span>Total</span>
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
