import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const SHIPPING_FEE = cart.length > 0 ? 6.99 : 0;

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const total = subtotal + SHIPPING_FEE;

  const handleContinueToCheckout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login?redirect=/cart");
      return;
    }

    setShowCheckoutForm(true);
    setTimeout(() => {
      document
        .getElementById("checkout-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handlePlaceOrder = async () => {
    if (!customer || !email || !address) {
      alert("Please fill all checkout fields");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      await api.post(
        "/orders",
        { items: cart, totalAmount: total },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      alert("Order placed successfully!");
      clearCart();
      localStorage.removeItem("cart");
      setShowCheckoutForm(false);
    } catch (error) {
      console.log(error);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-6 py-12 flex-1">
        {/* PAGE TITLE */}
        <h1 className="text-4xl font-black uppercase tracking-tight mb-10">
          Shopping Bag
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-2xl font-semibold mb-2">Your bag is empty</p>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added anything yet.
            </p>
            <Link
              to="/products"
              className="bg-black text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-pink-300 hover:text-black transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* LEFT — CART ITEMS */}
            <div className="lg:col-span-2 divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex gap-6 items-start">
                  {/* IMAGE */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-28 h-36 object-cover bg-gray-100 shrink-0"
                  />

                  {/* DETAILS */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                      She Style
                    </p>

                    <h2 className="font-bold text-base uppercase tracking-wide mb-1">
                      {item.name}
                    </h2>

                    <p className="text-base font-semibold mb-3">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="text-sm text-gray-500 space-y-1 mb-4">
                      <p>
                        <span className="inline-block w-20 text-gray-400">
                          Quantity
                        </span>
                        {item.quantity}
                      </p>
                      <p>
                        <span className="inline-block w-20 text-gray-400">
                          Total
                        </span>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* QUANTITY CONTROLS + REMOVE */}
                    <div className="flex items-center border border-gray-300 w-fit">
                      <button
                        onClick={() => removeFromCart(item.id.toString())}
                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition text-base"
                        title="Remove item"
                      >
                        🗑
                      </button>
                      <span className="w-9 h-9 flex items-center justify-center text-sm font-medium border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        className="w-9 h-9 flex items-center justify-center text-gray-400 cursor-not-allowed text-lg font-bold"
                        disabled
                        title="Quantity managed via product page"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — ORDER SUMMARY */}
            <div className="sticky top-24 space-y-5">
              <div className="border border-gray-200 p-6 space-y-4">
                {/* DISCOUNTS ROW */}
                <div className="flex justify-between items-center text-sm uppercase tracking-widest">
                  <span className="text-gray-500">Discounts</span>
                  <button className="underline font-semibold text-black hover:text-pink-400 transition text-xs">
                    Add
                  </button>
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Order value</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Estimated shipping fee
                    </span>
                    <span className="font-medium">
                      ${SHIPPING_FEE.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="border-t border-gray-300 pt-4 flex justify-between font-black text-base uppercase tracking-wide">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* CONTINUE TO CHECKOUT */}
                <button
                  onClick={handleContinueToCheckout}
                  className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-semibold hover:bg-pink-300 hover:text-black transition mt-2"
                >
                  Continue to Checkout
                </button>

                {/* SIGN IN / SIGN UP — shown when not logged in */}
                {!token && (
                  <div className="space-y-3 pt-1">
                    <Link
                      to="/login?redirect=/cart"
                      className="w-full border border-black py-4 uppercase tracking-widest text-sm font-semibold hover:bg-gray-50 transition flex items-center justify-center"
                    >
                      Sign In
                    </Link>
                    <p className="text-center text-xs text-gray-400">
                      New here?{" "}
                      <Link
                        to="/register?redirect=/cart"
                        className="underline text-black hover:text-pink-400 transition font-medium"
                      >
                        Create an account
                      </Link>
                    </p>
                  </div>
                )}

                {/* POLICIES */}
                <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 space-y-2 leading-relaxed">
                  <p>
                    The estimated tax will be confirmed once you add your
                    shipping address in checkout.
                  </p>
                  <p>
                    30-day returns.{" "}
                    <span className="underline cursor-pointer hover:text-black transition">
                      Read more about our return and refund policy.
                    </span>
                  </p>
                  <p>
                    Need help?{" "}
                    <span className="underline cursor-pointer hover:text-black transition">
                      Contact Customer Support
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHECKOUT FORM — slides in below when logged in */}
        {showCheckoutForm && (
          <div
            id="checkout-form"
            className="mt-16 max-w-2xl border border-gray-200 p-8"
          >
            <h2 className="text-xl font-black uppercase tracking-wide mb-6">
              Delivery Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Delivery Address
                </label>
                <textarea
                  placeholder="Street, City, Country"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition h-28 resize-none"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
              <div className="text-sm">
                <span className="text-gray-500 uppercase tracking-widest text-xs">
                  Order Total{" "}
                </span>
                <span className="font-black text-lg ml-2">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="bg-black text-white px-10 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-pink-300 hover:text-black transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
