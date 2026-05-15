import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/product";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data.products.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);

    alert("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="bg-white text-black">
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 bg-linear-to-br from-pink-50 to-white">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[6px] text-pink-400 font-medium mb-6">
              She Style Fashion
            </p>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
              Elevate Your
              <span className="text-pink-400 block">
                Fashion Style
              </span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Discover elegant dresses, trendy tops, and beautiful accessories
              designed for confident women.
            </p>

            <div className="flex flex-wrap gap-5">
              <Link
                to="/products"
                className="bg-black text-white px-8 py-4 rounded-xl hover:bg-pink-300 hover:text-black transition"
              >
                Shop Now
              </Link>

              <Link
                to="/register"
                className="border border-black px-8 py-4 rounded-xl hover:bg-black hover:text-white transition"
              >
                Join Now
              </Link>
            </div>
          </div>

          <div className="mt-16 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
              alt="Fashion"
              className="w-full max-w-xl rounded-3xl shadow-2xl object-cover"
            />
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="px-6 lg:px-20 py-20 bg-gray-50">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-14">
            <div>
              <p className="text-pink-400 font-medium mb-3">
                Featured
              </p>

              <h2 className="text-4xl font-bold">
                Trending Products
              </h2>
            </div>

            <Link
              to="/products"
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-pink-300 hover:text-black transition"
            >
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 mb-5 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold">
                      ${product.price}
                    </p>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-pink-300 text-black px-5 py-2 rounded-xl hover:bg-black hover:text-white transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROMO SECTION */}
        <section className="px-6 lg:px-20 pb-20">
          <div className="bg-black text-white rounded-3xl p-10 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <p className="text-pink-300 mb-4 uppercase tracking-[4px]">
                Limited Offer
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Get 25% Off
                <br />
                New Arrivals
              </h2>

              <p className="text-gray-300 max-w-xl">
                Upgrade your wardrobe with our latest fashion arrivals and
                exclusive seasonal collections.
              </p>
            </div>

            <Link
              to="/products"
              className="bg-pink-300 text-black px-8 py-4 rounded-xl font-medium hover:bg-white transition"
            >
              Explore Collection
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;