"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "../lib/api";
import { MAX_CART_QUANTITY } from "../lib/cartLimits";
import { useAuth } from "../lib/AuthContext";
import { useRouter } from "next/navigation";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    api.get("/api/products/")
      .then((res) => {
        const results = res.data.results || res.data;
        setProducts(Array.isArray(results) ? results : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      router.push("/login");
      return;
    }

    setAddingId(productId);
    try {
      const res = await api.post("/api/cart/cart/", {
        product: productId,
        quantity: 1
      });
      if (res.data?.quantity >= MAX_CART_QUANTITY) {
        setToastMessage(`Maximum ${MAX_CART_QUANTITY} per product in cart.`);
      } else {
        setToastMessage("Product added to cart!");
      }
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setToastMessage("Failed to add product to cart.");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setAddingId(null);
    }
  };

  const handleAddToWishlist = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      await api.post("/api/wishlist/", { product: productId });
      setToastMessage("Added to wishlist!");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      setToastMessage("Product is already in wishlist!");
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  if (loading) {
    return (
      <section className="page-section">
        <div className="section-header">
          <h2 className="section-title text-white">Our Products</h2>
        </div>
        <div className="product-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="h-96 rounded-2xl skeleton border border-white/5" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="page-section relative">
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 glass-card bg-slate-900/90 border border-violet-500/30 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slideDown">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="section-header">
        <span className="section-badge !bg-cyan-500/10 !text-cyan-400 !border-cyan-500/20">
          Exclusive Catalog
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Explore Our <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Products</span>
        </h2>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 glass-card border border-white/5 max-w-md mx-auto px-6">
          <p className="text-slate-400">No products found. Start adding products from the admin panel.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product, index) => {
            const discount = product.discount_price && product.price > product.discount_price
              ? Math.round(((product.price - product.discount_price) / product.price) * 100)
              : 0;

            return (
              <div 
                key={product.id} 
                className={`product-card flex flex-col h-full group animate-fadeInUp stagger-${(index % 4) + 1}`}
              >
                <div className="product-image-wrapper aspect-square flex items-center justify-center relative">
                  {discount > 0 && (
                    <span className="discount-badge">-{discount}%</span>
                  )}
                  {product.category && (
                    <span className="category-badge">{product.category}</span>
                  )}

                  <button 
                    type="button"
                    onClick={(e) => handleAddToWishlist(e, product.id)}
                    className="wishlist-btn"
                    title="Add to Wishlist"
                  >
                    ❤
                  </button>

                  <Link href={`/products/${product.id}`} className="relative w-[75%] h-[75%] block">
                    <Image
                      src={product.image || "/product.png"}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </Link>
                </div>

                <div className="product-card-body">
                  <div>
                    <Link href={`/products/${product.id}`} className="block">
                      <h3 className="product-title group-hover:text-violet-400 transition duration-300 line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="product-desc line-clamp-2 min-h-[2.5rem]">
                      {product.description || "No description provided for this product."}
                    </p>
                  </div>

                  <div className="product-card-footer">
                    <div className="product-meta-row">
                      <span className={`product-stock ${product.stock <= 0 ? "product-stock--out" : ""}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                      </span>
                    </div>

                    <div className="product-price-row">
                      <div className="product-price-block">
                        {discount > 0 ? (
                          <>
                            <span className="product-price-original">${product.price}</span>
                            <span className="product-price-current product-price-current--sale">
                              ${product.discount_price}
                            </span>
                          </>
                        ) : (
                          <span className="product-price-current">${product.price}</span>
                        )}
                      </div>
                      {discount > 0 && (
                        <span className="product-save-tag">Save {discount}%</span>
                      )}
                    </div>

                    <div className="product-card-actions">
                      <Link href={`/products/${product.id}`} className="btn-outline">
                        Details
                      </Link>
                      <button
                        onClick={(e) => handleAddToCart(e, product.id)}
                        disabled={product.stock <= 0 || addingId === product.id}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {addingId === product.id ? "Adding..." : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
