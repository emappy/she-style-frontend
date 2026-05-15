import { useEffect, useState } from "react";
import api from "../services/api";
import type { Product } from "../types/product";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import {  useSearchParams } from "react-router-dom";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  type ProductCategory = string | { name?: string } | undefined;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const productCategory = (product as { category?: ProductCategory })
      .category;
    const categoryName =
      typeof productCategory === "string"
        ? productCategory
        : productCategory?.name;

    const matchesCategory =
      selectedCategory === "All" || categoryName === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 border border-gray-300 rounded-xl px-5 py-3"
          />

          <div className="flex gap-3 flex-wrap">
            {["All", "Dresses", "Tops", "Head Bands"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-3 rounded-xl transition ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-pink-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-4">No products found</h2>

            <p className="text-gray-500">Try another search or category.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
