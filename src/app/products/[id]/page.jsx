"use client";
import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import api from "../../lib/api";
import { MAX_CART_QUANTITY } from "../../lib/cartLimits";
import { useAuth } from "../../lib/AuthContext";

export default function ProductDetail({ params }) {
  const { id } = use(params); // Unwrap params promise in Next.js 15
  const router = useRouter();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Review form states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProductAndReviews = async () => {
      try {
        const prodRes = await api.get(`/api/products/${id}/`);
        setProduct(prodRes.data);

        const revsRes = await api.get(`/api/reviews/?product=${id}`);
        setReviews(Array.isArray(revsRes.data) ? revsRes.data : revsRes.data.results || []);
      } catch (err) {
        console.error("Failed to load details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setAddingToCart(true);
    try {
      const res = await api.post("/api/cart/cart/", { product: product.id, quantity: 1 });
      if (res.data?.quantity >= MAX_CART_QUANTITY) {
        setToastMessage(`Maximum ${MAX_CART_QUANTITY} per product in cart.`);
      } else {
        setToastMessage("Added to cart successfully!");
      }
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setToastMessage("Failed to add to cart.");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setAddingToWishlist(true);
    try {
      await api.post("/api/wishlist/", { product: product.id });
      setToastMessage("Added to wishlist!");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      setToastMessage("Already in wishlist!");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setAddingToWishlist(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }

    setSubmittingReview(true);
    setReviewError("");
    try {
      const res = await api.post("/api/reviews/", {
        product: product.id,
        rating: parseInt(rating, 10),
        comment
      });
      // Append new review at the top
      setReviews([res.data, ...reviews]);
      setComment("");
      setRating(5);
      setToastMessage("Thank you for your review!");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to submit review:", err);
      setReviewError("Could not submit review. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <Link href="/products" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const discount = product.discount_price && product.price > product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <div className="page-container py-12 md:py-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 glass-card bg-slate-900/90 border border-violet-500/30 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slideDown">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Back Link */}
        <Link href="/products" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition duration-200 text-sm">
          ← Back to Catalog
        </Link>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Product Image Showcase */}
          <div className="glass border border-white/5 rounded-2xl p-8 flex items-center justify-center aspect-square relative shadow-2xl overflow-hidden">
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-600">ID: {product.id}</div>
            {discount > 0 && <span className="discount-badge !top-4 !right-4">-{discount}%</span>}
            
            <div className="relative w-4/5 h-4/5">
              <Image
                src={product.image || "/product.png"}
                alt={product.name}
                fill
                className="object-contain filter drop-shadow-[0_20px_50px_rgba(124,58,237,0.2)]"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>
          </div>

          {/* Right: Product Text Info */}
          <div className="space-y-6">
            <div>
              {product.category && (
                <span className="text-xs font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20">
                  {product.category}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-black text-white mt-4 leading-tight tracking-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3 mt-4">
                <div className="flex text-amber-400">
                  {"★".repeat(Math.round(avgRating))}
                  {"☆".repeat(5 - Math.round(avgRating))}
                </div>
                <span className="text-sm font-semibold text-slate-400">
                  {avgRating} ({reviews.length} customer reviews)
                </span>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="glass-card p-6 border border-white/5 flex items-center justify-between shadow-xl">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Price</span>
                <div className="flex items-baseline gap-3">
                  {discount > 0 ? (
                    <>
                      <span className="text-2xl font-black text-white">${product.discount_price}</span>
                      <span className="text-sm text-slate-500 line-through">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-black text-white">${product.price}</span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block mb-1">Availability</span>
                <span className={`text-sm font-bold ${product.stock > 0 ? "text-emerald-400" : "text-rose-500"}`}>
                  {product.stock > 0 ? `${product.stock} units in stock` : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Description</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                {product.description || "No description provided by seller. This high-quality item matches top industry standards and is subject to full customer warranty."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0 || addingToCart}
                className="btn-primary flex-1 !py-3.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? "Adding to Cart..." : "Add to Cart"}
              </button>

              <button
                onClick={handleAddToWishlist}
                disabled={addingToWishlist}
                className="btn-outline flex-1 !py-3.5 flex items-center justify-center gap-2"
              >
                ❤ Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-white/5 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side: Submit Review */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-extrabold text-white">Write a Review</h2>
            
            {user ? (
              <form onSubmit={handleReviewSubmit} className="glass-card p-6 space-y-4 border border-white/5 shadow-xl">
                {reviewError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-lg">
                    {reviewError}
                  </div>
                )}
                
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg py-2.5 px-3 text-sm text-slate-300 focus:outline-none focus:border-violet-500"
                  >
                    {[5, 4, 3, 2, 1].map((val) => (
                      <option key={val} value={val}>
                        {"★".repeat(val)} ({val} Stars)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Comments</label>
                  <textarea
                    placeholder="Tell us what you think..."
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="input-glass resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full btn-primary !py-2.5 text-xs"
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            ) : (
              <div className="glass-card p-6 text-center border border-white/5 space-y-3">
                <p className="text-slate-400 text-sm">Please log in to submit a product review.</p>
                <Link href="/login" className="btn-outline inline-block !py-2 !px-4 !text-xs">
                  Login Now
                </Link>
              </div>
            )}
          </div>

          {/* Right Side: Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
              Customer Reviews
              <span className="text-sm font-semibold bg-white/5 border border-white/10 text-slate-400 py-1 px-2.5 rounded-lg">
                {reviews.length} total
              </span>
            </h2>

            {reviews.length === 0 ? (
              <div className="glass-card p-12 text-center border border-white/5">
                <p className="text-slate-400 text-sm">No reviews yet for this product. Be the first to write one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="glass-card p-6 border border-white/5 space-y-3 shadow-md animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold uppercase">
                          {rev.username ? rev.username[0] : "?"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{rev.username || "Anonymous User"}</p>
                          <div className="flex text-amber-400 text-xs mt-0.5">
                            {"★".repeat(rev.rating)}
                            {"☆".repeat(5 - rev.rating)}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">Verified Buyer</span>
                    </div>

                    <p className="text-slate-350 text-sm leading-relaxed whitespace-pre-wrap pl-13">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
