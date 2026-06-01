"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '../lib/api';

const TopSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/products/')
      .then(res => {
        const items = res.data.results || res.data;
        const sorted = Array.isArray(items) 
          ? [...items].sort((a, b) => (b.stock || 0) - (a.stock || 0)).slice(0, 4)
          : [];
        setProducts(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch top sellers:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="page-section">
        <div className="section-header">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Trending <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Products</span>
          </h2>
        </div>
        <div className="product-grid">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-96 rounded-2xl skeleton border border-white/5" />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="page-section">
      <div className="section-header">
        <span className="section-badge">
          This Week&apos;s Favorites
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Best Sellers & <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Trending</span>
        </h2>
      </div>

      <div className="product-grid">
        {products.map((product, idx) => {
          const discount = product.discount_price && product.price > product.discount_price
            ? Math.round(((product.price - product.discount_price) / product.price) * 100)
            : 0;

          return (
            <div key={product.id} className={`product-card flex flex-col h-full group stagger-${idx + 1} animate-fadeInUp`}>
              <div className="product-image-wrapper aspect-square flex items-center justify-center relative">
                {discount > 0 && (
                  <span className="discount-badge">-{discount}%</span>
                )}
                {product.category && (
                  <span className="category-badge">{product.category}</span>
                )}
                
                <div className="relative w-[75%] h-[75%]">
                  <Image
                    src={product.image || "/product.png"}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>

              <div className="product-card-body">
                <div>
                  <h3 className="product-title line-clamp-1 group-hover:text-violet-400 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex text-amber-400 text-sm">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-xs text-slate-400">(4.8)</span>
                  </div>
                </div>

                <div className="product-card-footer">
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

                  <div className="flex justify-end">
                    <Link href={`/products/${product.id}`} className="btn-outline !py-2 !px-4 !text-xs">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopSellers;
