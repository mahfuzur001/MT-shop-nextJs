"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "../lib/api";
import { MAX_CART_QUANTITY } from "../lib/cartLimits";
import { useAuth } from "../lib/AuthContext";

export default function WishlistPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/api/wishlist/");
      setWishlistItems(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (err) {
      console.error("Failed to load wishlist:", err);
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
    fetchWishlist();
  }, [user, authLoading]);

  const handleRemoveItem = async (itemId) => {
    setActionId(itemId);
    try {
      await api.delete(`/api/wishlist/${itemId}/`);
      setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
      setToastMessage("Item removed from wishlist.");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to remove item:", err);
      setToastMessage("Failed to remove item.");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setActionId(null);
    }
  };

  const handleMoveToCart = async (item) => {
    setActionId(item.id);
    try {
      const res = await api.post("/api/cart/cart/", {
        product: item.product,
        quantity: 1
      });

      await api.delete(`/api/wishlist/${item.id}/`);

      setWishlistItems(wishlistItems.filter(wItem => wItem.id !== item.id));
      if (res.data?.quantity >= MAX_CART_QUANTITY) {
        setToastMessage(`Moved to cart (max ${MAX_CART_QUANTITY} per product).`);
      } else {
        setToastMessage("Item moved to cart!");
      }
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to move item to cart:", err);
      setToastMessage("Failed to move item to cart.");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setActionId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
          My <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Wishlist</span>
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="glass-card p-16 text-center border border-white/5 space-y-6 max-w-lg mx-auto shadow-2xl">
            <p className="text-slate-400 text-base px-4">Your wishlist is currently empty.</p>
            <div className="pt-2">
              <Link href="/products" className="btn-primary">
                Browse Catalog
              </Link>
            </div>
          </div>
        ) : (
          <div className="product-grid-3">
            {wishlistItems.map((item) => {
              const prod = item.product_details;
              if (!prod) return null;
              const discount = prod.discount_price && prod.price > prod.discount_price
                ? Math.round(((prod.price - prod.discount_price) / prod.price) * 100)
                : 0;

              return (
                <div
                  key={item.id}
                  className="product-card flex flex-col justify-between h-full group animate-fadeIn"
                >
                  {/* Image wrapper */}
                  <div className="product-image-wrapper aspect-square flex items-center justify-center relative">
                    {discount > 0 && <span className="discount-badge">-{discount}%</span>}
                    {prod.category && <span className="category-badge">{prod.category}</span>}
                    
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={actionId === item.id}
                      className="wishlist-btn wishlist-btn--remove"
                      title="Remove from wishlist"
                    >
                      ✕
                    </button>

                    <Link href={`/products/${prod.id}`} className="relative w-[75%] h-[75%] block">
                      <Image
                        src={prod.image || "/product.png"}
                        alt={prod.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 250px"
                      />
                    </Link>
                  </div>

                  <div className="product-card-body">
                    <div>
                      <Link href={`/products/${prod.id}`}>
                        <h3 className="product-title group-hover:text-violet-400 transition line-clamp-1">
                          {prod.name}
                        </h3>
                      </Link>
                      <p className="product-desc line-clamp-2">
                        {prod.description || "No description provided."}
                      </p>
                    </div>

                    <div className="product-card-footer">
                      <div className="product-meta-row">
                        <span className={`product-stock ${prod.stock <= 0 ? "product-stock--out" : ""}`}>
                          {prod.stock > 0 ? `${prod.stock} in stock` : "Out of Stock"}
                        </span>
                      </div>

                      <div className="product-price-row">
                        <div className="product-price-block">
                          {discount > 0 ? (
                            <>
                              <span className="product-price-original">${prod.price}</span>
                              <span className="product-price-current product-price-current--sale">
                                ${prod.discount_price}
                              </span>
                            </>
                          ) : (
                            <span className="product-price-current">${prod.price}</span>
                          )}
                        </div>
                        {discount > 0 && (
                          <span className="product-save-tag">Save {discount}%</span>
                        )}
                      </div>

                      <div className="product-card-actions">
                        <Link href={`/products/${prod.id}`} className="btn-outline">
                          View details
                        </Link>
                        <button
                          onClick={() => handleMoveToCart(item)}
                          disabled={prod.stock <= 0 || actionId === item.id}
                          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionId === item.id ? "Moving..." : "Move to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
