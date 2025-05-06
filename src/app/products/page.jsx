"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <main className="bg-gray-50 text-black">
      <section className="py-10 max-w-7xl mx-auto">

        {/* Product List */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"> */}
          {/* Product Card 1 */}

          <div className="mb-6 ">
            <h2 className="text-black text-4xl text-center m-6 ">
            Our Products
            </h2>
            <div className="flex gap-5 flex-wrap   max-w-full justify-items-center ">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="card shadow-4xl text-white bg-black card bg-base-100 image-full w-96 shadow-sm"
                >
                  <figure className="flex justify-center">
                    <img
                      src={product.image || "https://via.placeholder.com/250"}
                      alt={product.name}
                      className="w-[70px] rounded-full mt-4"
                    />
                  </figure>
                  <div className="card-body p-5">
                    <h2 className="card-title text-center">{product.name}</h2>
                    {/* <p className="text-center">{product.description}</p> */}
                    {/* <p className="text-center">{product.price}</p> */}
                    {/* <p className="text-center">{product.stock}</p> */}
                    <Link
                      href={`/products/${product.id}`}
                      className="text-blue-500 underline text-center block mt-2"
                    >
                      More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        {/* </div> */}
        <div className="flex justify-center mt-8">
          <button className="btn btn-primary mx-2">Prev</button>
          <button className="btn btn-primary mx-2">Next</button>
        </div>
      </section>
    </main>
  );
}
