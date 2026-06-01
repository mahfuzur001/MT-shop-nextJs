"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import { getMaxAllowedQuantity, clampQuantity } from "../lib/cartLimits";

export default function CartPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const fetchCart = async () => {
    try {
      const res = await api.get("/api/cart/cart/");
      let items = Array.isArray(res.data) ? res.data : res.data.results || [];

      // Clamp any legacy quantities above the per-product limit
      items = await Promise.all(
        items.map(async (item) => {
          const stock = item.product_details?.stock;
          const maxAllowed = getMaxAllowedQuantity(stock);
          if (item.quantity > maxAllowed) {
            try {
              const patched = await api.patch(`/api/cart/cart/${item.id}/`, {
                quantity: maxAllowed,
              });
              return patched.data;
            } catch {
              return { ...item, quantity: maxAllowed };
            }
          }
          return item;
        })
      );

      setCartItems(items);
    } catch (err) {
      console.error("Failed to load cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    fetchCart();
  }, [user, authLoading]);

  const handleQuantityChange = async (itemId, currentQty, amount, stock) => {
    const maxAllowed = getMaxAllowedQuantity(stock);
    const newQty = clampQuantity(currentQty + amount, stock);

    if (newQty === currentQty) {
      if (amount > 0) {
        setToastMessage(`Maximum ${maxAllowed} per product allowed.`);
        setTimeout(() => setToastMessage(""), 3000);
      }
      return;
    }

    setUpdatingId(itemId);
    try {
      await api.patch(`/api/cart/cart/${itemId}/`, { quantity: newQty });
      setCartItems(cartItems.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setToastMessage("Failed to update quantity.");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemoveItem = async (itemId) => {
    setUpdatingId(itemId);
    try {
      await api.delete(`/api/cart/cart/${itemId}/`);
      setCartItems(cartItems.filter(item => item.id !== itemId));
      setToastMessage("Item removed from cart.");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to remove item:", err);
      setToastMessage("Failed to remove item.");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    router.push("/checkout");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculation
  const subtotal = cartItems.reduce((sum, item) => {
    const prod = item.product_details;
    if (!prod) return sum;
    const price = prod.discount_price && prod.price > prod.discount_price ? prod.discount_price : prod.price;
    return sum + (parseFloat(price) * item.quantity);
  }, 0);

  const shipping = subtotal > 150 ? 0 : subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="page-container py-12 md:py-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 glass-card bg-slate-900/90 border border-violet-500/30 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slideDown">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight">
          Shopping <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Cart</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="glass-card p-16 text-center border border-white/5 space-y-6 max-w-lg mx-auto shadow-2xl">
            <p className="text-slate-400 text-base px-4">Your shopping cart is currently empty.</p>
            <div className="pt-2">
              <Link href="/products" className="btn-primary">
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const prod = item.product_details;
                if (!prod) return null;
                const finalPrice = prod.discount_price && prod.price > prod.discount_price ? prod.discount_price : prod.price;
                const maxAllowed = getMaxAllowedQuantity(prod.stock);

                return (
                  <div
                    key={item.id}
                    className="glass-card p-4 md:p-6 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg relative animate-fadeIn"
                  >
                    {/* Product Details Wrapper */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 px-2 sm:px-4">
                      <div className="relative w-20 h-20 bg-white/5 rounded-xl border border-white/5 p-2 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                          src={prod.image || "/product.png"}
                          alt={prod.name}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      </div>
                      <div className="text-center sm:text-left space-y-1 px-2">
                        <Link href={`/products/${prod.id}`}>
                          <h3 className="text-base font-bold text-white hover:text-violet-400 transition line-clamp-2">
                            {prod.name}
                          </h3>
                        </Link>
                        <span className="text-xs font-mono text-violet-400 block">{prod.category}</span>
                      </div>
                    </div>

                    {/* Adjust Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1, prod.stock)}
                        disabled={item.quantity <= 1 || updatingId === item.id}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold text-white w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1, prod.stock)}
                        disabled={updatingId === item.id || item.quantity >= maxAllowed}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                        title={item.quantity >= maxAllowed ? `Maximum ${maxAllowed} per product` : "Increase quantity"}
                      >
                        +
                      </button>
                    </div>

                    {/* Cost Display and Remove */}
                    <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto px-2 sm:px-4">
                      <div className="text-right sm:w-24">
                        <span className="text-sm font-black text-white block px-2">
                          ${(parseFloat(finalPrice) * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-xs text-slate-500 px-2">
                          ${finalPrice} each
                        </span>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={updatingId === item.id}
                        className="text-xs text-rose-400 hover:text-rose-300 hover:underline transition font-semibold px-2 whitespace-nowrap"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1 glass-card p-6 md:p-8 border border-white/5 shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-white pb-4 border-b border-white/5 px-2">Order Summary</h3>

              <div className="space-y-4 text-sm px-2">
                <div className="flex justify-between text-slate-400 py-2">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 py-2">
                  <span>Shipping</span>
                  <span className="font-semibold text-white">
                    {shipping === 0 ? <span className="text-emerald-400 font-bold uppercase">Free</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-slate-500 leading-normal py-2">
                    💡 Spend over $150.00 for FREE shipping!
                  </p>
                )}
                
                <div className="pt-4 border-t border-white/5 flex justify-between text-base font-black text-white py-2">
                  <span>Total</span>
                  <span className="text-xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full btn-primary !py-3.5 mt-2 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
