import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [callUsOpen, setCallUsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setProfileOpen(false);
    navigate("/login");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Lock body scroll when overlays/drawers are open
  useEffect(() => {
    if (callUsOpen || searchOpen || menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [callUsOpen, searchOpen, menuOpen]);

  const menuCategories = [
    { label: "New", path: "/products?category=new" },
    { label: "Dresses", path: "/products?category=dresses" },
    { label: "Tops", path: "/products?category=tops" },
    { label: "Head Bands", path: "/products?category=headbands" },
  ];

  return (
    <>
      {/* ── SEARCH OVERLAY ── */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-8 text-2xl text-gray-400 hover:text-black transition"
            aria-label="Close search"
          >
            ✕
          </button>

          <p className="text-xs uppercase tracking-[6px] text-gray-400 mb-6">
            Search She Style
          </p>

          <form onSubmit={handleSearchSubmit} className="w-full max-w-xl px-6">
            <div className="flex items-center border-b-2 border-black pb-2">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 text-2xl font-light outline-none bg-transparent placeholder-gray-300"
              />

              <button
                type="submit"
                aria-label="Search"
                title="Search"
                className="ml-4 text-gray-500 hover:text-black transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── MENU DRAWER (LEFT) ── */}

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${
          menuOpen
            ? "opacity-30 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-gray-100">
          <h2 className="text-lg font-light tracking-widest uppercase">
            Menu
          </h2>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-400 hover:text-black transition text-xl"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-1">
            {menuCategories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.path}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-sm uppercase tracking-[4px] text-gray-700 hover:text-pink-400 transition border-b border-gray-50"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="text-xs uppercase tracking-[4px] text-gray-400 hover:text-pink-400 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* ── CALL US DRAWER (RIGHT) ── */}

      {/* Backdrop */}
      <div
        onClick={() => setCallUsOpen(false)}
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${
          callUsOpen
            ? "opacity-30 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          callUsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6">
          <h2 className="text-lg font-light tracking-widest">Call Us</h2>

          <button
            onClick={() => setCallUsOpen(false)}
            className="text-gray-400 hover:text-black transition text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* DRAWER BODY */}
        <div className="flex-1 overflow-y-auto px-8">
          <p className="text-sm text-gray-400 leading-relaxed mb-8">
            Wherever you are, She Style Client Advisors will be delighted to
            assist you.
          </p>

          <div className="space-y-6">
            <a
              href="tel:+251900000000"
              className="flex items-center gap-4 text-sm text-gray-700 hover:text-pink-400 transition"
            >
              <span className="font-light tracking-wide">
                +251 900 000 000
              </span>
            </a>

            <a
              href="https://wa.me/251900000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-sm text-gray-700 hover:text-pink-400 transition"
            >
              <span className="font-light tracking-wide">WhatsApp</span>
            </a>

            <a
              href="https://t.me/shestyle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-sm text-gray-700 hover:text-pink-400 transition"
            >
              <span className="font-light tracking-wide">Telegram</span>
            </a>

            <a
              href="https://m.me/shestyle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-sm text-gray-700 hover:text-pink-400 transition"
            >
              <span className="font-light tracking-wide">
                Facebook Messenger
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 px-6 h-16 flex items-center justify-between shadow-sm">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          {/* MENU */}
          <div ref={menuRef}>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 hover:text-pink-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <span className="text-xs font-medium tracking-[3px] uppercase">
                Menu
              </span>
            </button>
          </div>

          {/* SEARCH */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 hover:text-pink-400 transition"
            aria-label="Open search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>

            <span className="text-xs font-medium tracking-[3px] uppercase">
              Search
            </span>
          </button>
        </div>

        {/* CENTER */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl font-black uppercase tracking-[6px] text-black hover:text-pink-400 transition">
            She Style
          </h1>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* CALL US */}
          <button
            onClick={() => setCallUsOpen(true)}
            className="hidden md:flex items-center gap-1.5 text-xs tracking-widest uppercase text-gray-600 hover:text-pink-400 transition"
          >
            Call Us
          </button>

          {/* PROFILE */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center hover:text-pink-400 transition"
              aria-label="Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>

            {profileOpen && (
              <div className="absolute top-full right-0 mt-3 w-48 bg-white border border-gray-100 shadow-xl z-50 py-2">
                {parsedUser ? (
                  <>
                    <div className="px-5 py-3 border-b border-gray-100">
                      <p className="text-xs text-gray-400 uppercase tracking-widest">
                        Signed in as
                      </p>

                      <p className="text-sm font-semibold mt-0.5 truncate">
                        {parsedUser.name}
                      </p>
                    </div>

                    {parsedUser.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="block px-5 py-3 text-xs uppercase tracking-widest text-gray-600 hover:text-pink-400 hover:bg-gray-50 transition"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-600 hover:text-pink-400 hover:bg-gray-50 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setProfileOpen(false)}
                      className="block px-5 py-3 text-xs uppercase tracking-widest text-gray-600 hover:text-pink-400 hover:bg-gray-50 transition"
                    >
                      Sign In
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setProfileOpen(false)}
                      className="block px-5 py-3 text-xs uppercase tracking-widest text-gray-600 hover:text-pink-400 hover:bg-gray-50 transition"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* BAG */}
          <Link
            to="/cart"
            className="relative flex items-center hover:text-pink-400 transition"
            aria-label="Shopping bag"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-300 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
