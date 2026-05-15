import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  size: string;
}

function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        setProduct(response.data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Product not found
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert("Added to cart!");
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="px-6 lg:px-20 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-3xl object-cover shadow-xl"
            />
          </div>

          <div>
            <p className="text-pink-400 font-medium uppercase tracking-[4px] mb-4">
              She Style Collection
            </p>

            <h1 className="text-5xl font-bold mb-6">{product.name}</h1>

            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {product.description}
            </p>

            <div className="flex items-center gap-6 mb-8">
              <p className="text-4xl font-bold">${product.price}</p>

              <span className="bg-pink-100 px-4 py-2 rounded-full">
                Stock: {product.stock}
              </span>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-3">Size</h3>

              <div className="flex gap-3">
                <button className="border px-5 py-3 rounded-xl hover:bg-black hover:text-white transition">
                  {product.size}
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-10 py-4 rounded-xl hover:bg-pink-300 hover:text-black transition text-lg"
            >
              Add To Cart
            </button>

            <div className="mt-14 border-t pt-10">
              <h2 className="text-2xl font-bold mb-4">Product Details</h2>

              <div className="space-y-3 text-gray-600">
                <p>Premium quality women's fashion item.</p>

                <p>Carefully designed for comfort and elegance.</p>

                <p>Suitable for casual and special occasions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
