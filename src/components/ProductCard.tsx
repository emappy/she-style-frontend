import type { Product } from "../types/product";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-72 object-cover"
        />

        <div className="p-4">
          <h2 className="text-xl font-semibold">{product.name}</h2>

          <p className="text-pink-400 font-bold mt-2">${product.price}</p>

          <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-pink-300 hover:text-black transition">
            View Product
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
