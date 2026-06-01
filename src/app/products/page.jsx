"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "../lib/api";
import { MAX_CART_QUANTITY } from "../lib/cartLimits";
import { useAuth } from "../lib/AuthContext";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
  { value: "home", label: "Home & Garden" },
  { value: "sports", label: "Sports" },
  { value: "beauty", label: "Beauty" },
  { value: "toys", label: "Toys" },
  { value: "food", label: "Food" },
  { value: "general", label: "General" }
];

const SORT_OPTIONS = [
  { value: "-created_at", label: "Newest Arrivals" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "name", label: "Alphabetical" }
];

const PRODUCT_PAGE_SIZE = 4;

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Filters State
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [ordering, setOrdering] = useState(searchParams.get("ordering") || "-created_at");
  const [page, setPage] = useState(() => {
    const rawPage = searchParams.get("page") || "1";
    const parsed = Number.parseInt(rawPage, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  });
  
  // Pagination details from Django API
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [pageSize, setPageSize] = useState(PRODUCT_PAGE_SIZE);

  // Sync state with URL params
  useEffect(() => {
    setCategory(searchParams.get("category") || "");
    setSearch(searchParams.get("search") || "");
    setOrdering(searchParams.get("ordering") || "-created_at");
    const rawPage = searchParams.get("page") || "1";
    const parsed = Number.parseInt(rawPage, 10);
    setPage(Number.isFinite(parsed) && parsed > 0 ? parsed : 1);
  }, [searchParams]);

  // Fetch products when state changes
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (ordering) params.append("ordering", ordering);
    if (page > 1) params.append("page", page);

    api.get(`/api/products/?${params.toString()}`)
      .then((res) => {
        // If paginated response
        if (res.data.results) {
          setProducts(res.data.results);
          setCount(res.data.count);
          setNext(res.data.next);
          setPrevious(res.data.previous);
          setPageSize(res.data.page_size || PRODUCT_PAGE_SIZE);
        } else {
          // If non-paginated array response
          setProducts(res.data);
          setCount(res.data.length);
          setNext(null);
          setPrevious(null);
          setPageSize(res.data.length || PRODUCT_PAGE_SIZE);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 404 && page !== 1) {
          updateUrlParams({ page: 1 });
        } else {
          console.error("Failed to fetch products:", err);
        }
        setLoading(false);
      });
  }, [search, category, ordering, page]);

  const updateUrlParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/products?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateUrlParams({ search, page: 1 });
  };

  const handleCategoryChange = (catVal) => {
    updateUrlParams({ category: catVal, page: 1 });
  };

  const handleSortChange = (value) => {
    updateUrlParams({ ordering: value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateUrlParams({ page: newPage });
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      return;
    }

    setAddingId(productId);
    try {
      const res = await api.post("/api/cart/cart/", { product: productId, quantity: 1 });
      if (res.data?.quantity >= MAX_CART_QUANTITY) {
        setToastMessage(`Maximum ${MAX_CART_QUANTITY} per product in cart.`);
      } else {
        setToastMessage("Added to cart!");
      }
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setToastMessage("Failed to add to cart.");
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
      console.error("Wishlist error:", err);
      setToastMessage("Already in wishlist!");
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  const totalPages = count > 0 ? Math.ceil(count / pageSize) : 0;
  const pageNumbers = totalPages > 0 ? Array.from({ length: totalPages }, (_, idx) => idx + 1) : [];
  const shouldShowPagination = totalPages > 1;
  const activeCategoryLabel =
    CATEGORIES.find((cat) => cat.value === category)?.label || "All Categories";
  const activeSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === ordering)?.label || "Newest Arrivals";

  return (
    <div className="page-container py-12 md:py-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 glass-card bg-slate-900/90 border border-violet-500/30 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slideDown">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-white/5 pb-8">
          <h1 className="text-3xl md:text-5xl font-black text-white">
            Our <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Catalog</span>
          </h1>
          <p className="text-slate-400 text-sm mt-4">Browse the newest products and collections</p>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Left: Sidebar Filters */}
          <div className="glass-card p-6 space-y-6 lg:sticky lg:top-24">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Search</h3>
              <form onSubmit={handleSearchSubmit} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="Type to search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-glass !py-3 !px-4 rounded-2xl"
                />
                <button type="submit" className="btn-primary !py-3 !px-5">Go</button>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Categories</h3>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`text-left text-sm py-3 px-4 rounded-2xl transition duration-200 ${
                      category === cat.value
                        ? "bg-violet-600 text-white font-semibold"
                        : "hover:bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Products Grid */}
          <div className="lg:col-span-3 space-y-8">
            <div className="glass-card border border-white/5 p-4 md:p-5">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Product List
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-black text-white">
                      {loading ? "Loading products..." : `${count} product${count === 1 ? "" : "s"} found`}
                    </p>
                    <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-200">
                      {activeCategoryLabel}
                    </span>
                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                      {activeSortLabel}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 xl:text-right">
                    Sort By
                  </span>
                  <div className="relative w-full sm:w-72">
                    <select
                      value={ordering}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-violet-500/40 bg-slate-950/80 px-4 py-3 pr-11 text-sm font-semibold text-slate-200 outline-none transition duration-200 hover:border-violet-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-violet-300">
                      v
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-96 rounded-2xl skeleton border border-white/5" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="glass-card text-center py-20 border border-white/5">
                <p className="text-slate-400 text-lg px-4 py-4">No products match your filters.</p>
                <button
                  onClick={() => router.push("/products")}
                  className="btn-outline mt-4 mx-4"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="product-grid-3">
                  {products.map((product, idx) => {
                    const discount = product.discount_price && product.price > product.discount_price
                      ? Math.round(((product.price - product.discount_price) / product.price) * 100)
                      : 0;

                    return (
                      <div
                        key={product.id}
                        className={`product-card flex flex-col justify-between h-full group stagger-${(idx % 3) + 1} animate-fadeInUp`}
                      >
                        <div className="product-image-wrapper aspect-square flex items-center justify-center relative">
                          {discount > 0 && <span className="discount-badge">-{discount}%</span>}
                          {product.category && <span className="category-badge">{product.category}</span>}
                          
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
                              sizes="(max-width: 768px) 100vw, 250px"
                            />
                          </Link>
                        </div>

                        <div className="product-card-body">
                          <div>
                            <Link href={`/products/${product.id}`}>
                              <h3 className="product-title group-hover:text-violet-400 transition duration-300 line-clamp-1">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="product-desc line-clamp-2">
                              {product.description || "No description provided."}
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
                              <Link
                                href={`/products/${product.id}`}
                                className="btn-outline"
                              >
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

                {/* Pagination Controls */}
                {shouldShowPagination && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 px-2">
                    <p className="text-xs font-semibold text-slate-500">
                      Showing {products.length} of {count} products
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={!previous}
                      className="btn-outline !py-2.5 !px-4 text-xs disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>
                    {pageNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`h-10 w-10 rounded-full border text-xs font-bold transition duration-200 ${
                          page === pageNumber
                            ? "border-violet-400 bg-violet-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                            : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-violet-500/40 hover:text-white"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={!next}
                      className="btn-outline !py-2.5 !px-4 text-xs disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
