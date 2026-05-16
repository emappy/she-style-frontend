import { useEffect, useState } from "react";

import api from "../../services/api";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  size: string;
  categoryId: number;
};

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(false);

  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
    size: "",
    categoryId: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      stock: "",
      size: "",
      categoryId: "",
    });

    setEditingProductId(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl,
      stock: product.stock.toString(),
      size: product.size,
      categoryId: product.categoryId.toString(),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();

      alert("Product deleted");
    } catch (error) {
      console.log(error);

      alert("Delete failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        categoryId: Number(formData.categoryId),
      };

      if (editingProductId) {
        await api.put(`/products/${editingProductId}`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Product updated");
      } else {
        await api.post("/products", productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Product created");
      }

      fetchProducts();

      resetForm();
    } catch (error) {
      console.log(error);

      alert("Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Products</h1>

          <p className="text-gray-500 mt-2">Manage store inventory</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            {editingProductId ? "Edit Product" : "Add Product"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl h-28"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              type="text"
              name="size"
              placeholder="Size"
              value={formData.size}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <select
              aria-label="Product Category"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            >
              <option value="">Select Category</option>

              <option value="1">Dresses</option>

              <option value="2">Tops</option>

              <option value="3">Head Bands</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-pink-300 hover:text-black transition"
            >
              {loading
                ? "Saving..."
                : editingProductId
                  ? "Update Product"
                  : "Create Product"}
            </button>

            {editingProductId && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-gray-200 py-3 rounded-xl"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="lg:col-span-2 space-y-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-5 shadow-sm flex flex-col md:flex-row gap-5 md:items-center"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-28 h-28 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h3 className="text-2xl font-bold">{product.name}</h3>

                <p className="text-gray-500 mt-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex gap-6 mt-4 text-sm">
                  <span>Price: ${product.price}</span>

                  <span>
                    Stock:
                    {product.stock}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-pink-300 text-black px-5 py-2 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-black text-white px-5 py-2 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
