import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ShoppingCart, Heart, User, Sparkles, ShieldCheck, 
  Truck, CreditCard, Award, ArrowRight, X, Star, CheckCircle, 
  Menu, ChevronRight, Phone, Mail, MapPin, Trash2, ArrowUp,
  SlidersHorizontal, Percent, ChevronLeft
} from 'lucide-react';

// --- Curated Product Data ---
const PRODUCTS = [
  {
    id: 1,
    name: "Crabtree Premium Glass Switch Panel",
    brand: "Havells",
    price: 3499,
    oldPrice: 4299,
    category: "switches",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80",
    badge: "Bestseller",
    description: "Elegant modular switch board with a tempered glass finish and responsive smart touch sensitivity."
  },
  {
    id: 2,
    name: "Hue Smart LED Ceiling Panel",
    brand: "Philips",
    price: 8999,
    oldPrice: 10999,
    category: "lighting",
    rating: 4.9,
    reviews: 218,
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=500&q=80",
    badge: "15% OFF",
    description: "Dimmable smart ambient lighting with millions of colors, fully compatible with Alexa and Google Home."
  },
  {
    id: 3,
    name: "LifeLine Shield FR-LSH Cable 90m",
    brand: "Havells",
    price: 4500,
    oldPrice: 5200,
    category: "wires & cables",
    rating: 4.7,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    badge: "Popular",
    description: "Flame Retardant Low Smoke Halogen-free electrical wiring wire for absolute safety."
  },
  {
    id: 4,
    name: "SilentPro Luxury Ceiling Fan 1200mm",
    brand: "Crompton",
    price: 6800,
    oldPrice: 7999,
    category: "fans",
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1618944847828-82e943c3dba7?w=500&q=80",
    badge: "Eco-Friendly",
    description: "High-speed brushless DC motor ceiling fan with super silent operation and smart remote control."
  },
  {
    id: 5,
    name: "Roma Classic Modular Switches (Pack of 10)",
    brand: "Anchor",
    price: 1200,
    oldPrice: 1500,
    category: "switches",
    rating: 4.8,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&q=80",
    badge: "Bestseller",
    description: "Durable Polycarbonate modular electrical switches designed for smooth tactile feedback."
  },
  {
    id: 6,
    name: "Premium Induction Cooktop 2000W",
    brand: "Bajaj",
    price: 3899,
    oldPrice: 4999,
    category: "home appliances",
    rating: 4.5,
    reviews: 82,
    image: "https://images.unsplash.com/photo-1574269661728-796aa9c48cb8?w=500&q=80",
    badge: "Hot Deal",
    description: "Energy-efficient electromagnetic heating cooktop with preset cooking menus and auto-off timer."
  },
  {
    id: 7,
    name: "Professional Electrician Tool Kit V2",
    brand: "Syska",
    price: 2499,
    oldPrice: 2999,
    category: "tools",
    rating: 4.8,
    reviews: 110,
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=80",
    badge: "New",
    description: "Complete diagnostic and setup electrical kit with heavy-duty insulated tools."
  },
  {
    id: 8,
    name: "Deco Light Premium Brass Holder",
    brand: "Anchor",
    price: 450,
    oldPrice: 600,
    category: "lighting",
    rating: 4.9,
    reviews: 73,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    badge: "Exclusive",
    description: "Solid vintage brass lamp holder with a premium textured finish for designer lighting setups."
  }
];

const CATEGORIES = [
  { id: "lighting", name: "Lighting", count: "48 Items", icon: "💡", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80" },
  { id: "switches", name: "Switches", count: "35 Items", icon: "🔌", image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80" },
  { id: "wires & cables", name: "Wires & Cables", count: "62 Items", icon: "〰️", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id: "fans", name: "Fans", count: "29 Items", icon: "🌀", image: "https://images.unsplash.com/photo-1618944847828-82e943c3dba7?w=400&q=80" },
  { id: "home appliances", name: "Home Appliances", count: "44 Items", icon: "🍳", image: "https://images.unsplash.com/photo-1574269661728-796aa9c48cb8?w=400&q=80" },
  { id: "tools", name: "Tools", count: "55 Items", icon: "🛠️", image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&q=80" }
];

const BRANDS = [
  { name: "Havells", logo: "⚡" },
  { name: "Anchor", logo: "⚓" },
  { name: "Philips", logo: "💡" },
  { name: "Crompton", logo: "🌀" },
  { name: "Syska", logo: "✨" },
  { name: "Bajaj", logo: "🔥" }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Arjun Kumar",
    location: "Colombo, Sri Lanka",
    rating: 5,
    text: "The quality of the Crabtree Switch Panels is unmatched. They give our living room an extremely premium, minimalistic look. Highly recommended!",
    avatar: "AK"
  },
  {
    id: 2,
    name: "Shamila Fernando",
    location: "Kandy, Sri Lanka",
    rating: 5,
    text: "Ordered silent ceiling fans in bulk for our new boutique hotel. Extremely fast delivery and support from the team has been phenomenal.",
    avatar: "SF"
  },
  {
    id: 3,
    name: "Ranjith Perera",
    location: "Galle, Sri Lanka",
    rating: 5,
    text: "Golden Electrical is my B2B go-to partner for all electrical cables and circuit breakers. Reliable quality with genuine brand warranties.",
    avatar: "RP"
  }
];

export default function App() {
  // --- State Variables ---
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form State
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSuccess, setFormSuccess] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  // --- Helpers ---
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Cart & Wishlist Logic ---
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to Cart`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        showToast(`Removed ${product.name} from Wishlist`);
        return prev.filter(item => item.id !== product.id);
      }
      showToast(`Added ${product.name} to Wishlist`);
      return [...prev, product];
    });
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // --- Filtered Products ---
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === "all" || p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeCategory]);

  // --- Scroll to Top Indicator ---
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.email || !quoteForm.message) {
      showToast("Please fill in all required fields.");
      return;
    }
    setFormSuccess(true);
    setQuoteForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setFormSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-secondary antialiased selection:bg-primary/20 selection:text-secondary">
      
      {/* --- STICKY GLASSMORPHIC HEADER --- */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
              <span className="text-xl font-bold text-secondary">⚡</span>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-secondary">Golden <span className="text-primary font-extrabold">Electrical</span></span>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Storefront</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'Products', 'Categories', 'About', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-secondary relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* Search Toggle / Input */}
            <div className="relative hidden sm:block">
              <input 
                type="text"
                placeholder="Search premium products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 pl-10 text-xs font-medium text-secondary outline-none transition-all focus:w-60 focus:border-primary focus:bg-white"
              />
              <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Wishlist */}
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="relative rounded-full p-2 text-gray-600 transition-all hover:bg-gray-50 hover:text-red-500"
              aria-label="Open Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full p-2 text-gray-600 transition-all hover:bg-gray-50 hover:text-primary"
              aria-label="Open Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-white shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User */}
            <button 
              onClick={() => showToast("User authentication feature loaded.")}
              className="hidden sm:block rounded-full p-2 text-gray-600 transition-all hover:bg-gray-50 hover:text-secondary"
              aria-label="User Account"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full p-2 text-gray-600 transition-all hover:bg-gray-50 md:hidden"
              aria-label="Toggle Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 z-40 border-b border-gray-100 bg-white/95 px-6 py-6 shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search premium products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pl-10 text-sm outline-none focus:border-primary focus:bg-white"
                />
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
              {['Home', 'Products', 'Categories', 'About', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-base font-semibold text-gray-700 hover:text-secondary py-2 border-b border-gray-50"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Hero text content */}
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold text-secondary">
                <Sparkles className="h-3 w-3 text-primary fill-primary" />
                Trusted Electrical Partner Since 2018
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl md:text-6xl leading-[1.08] lg:leading-[1.05]">
                Powering Modern Spaces with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Premium Solutions</span>
              </h1>
              <p className="max-w-md text-base text-gray-500 sm:text-lg">
                Discover safe, durable, and energy-efficient electrical components curated for architectural excellence.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="group inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-secondary/90 hover:shadow-xl active:scale-95"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button 
                  onClick={() => scrollToSection('categories')}
                  className="rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
                >
                  Explore Categories
                </button>
              </div>

              {/* Minimal Trust Factors */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                <div>
                  <h4 className="text-xl font-bold text-secondary">5k+</h4>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Happy Clients</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-secondary">100%</h4>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Certified Genuine</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-secondary">24/7</h4>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Expert Support</p>
                </div>
              </div>
            </motion.div>

            {/* Hero image panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative lg:ml-6"
            >
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/10 to-orange-500/10 blur-3xl"></div>
              <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-4 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80" 
                  alt="Premium Electrical Products Showcase" 
                  className="h-[320px] w-full rounded-2xl object-cover sm:h-[400px] transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
              </div>
              
              {/* Float Card Indicator */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-secondary">Genuine Warranty</p>
                  <p className="text-[10px] text-gray-400">Up to 3 Years Cover</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURED CATEGORIES --- */}
      <section id="categories" className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Department Store</span>
            <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Featured Categories</h2>
            <p className="text-gray-500 text-sm">Explore our catalog by category to find engineered electrical assets tailored to your architectural standards.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((cat) => (
              <motion.div
                whileHover={{ y: -6 }}
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  scrollToSection('products');
                }}
                className={`group cursor-pointer rounded-2xl border p-4 text-center transition-all ${
                  activeCategory === cat.id 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg'
                }`}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <h3 className="text-xs font-bold text-secondary tracking-tight">{cat.name}</h3>
                <p className="mt-1 text-[10px] text-gray-400 font-semibold">{cat.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW ARRIVALS & PRODUCTS SECTION --- */}
      <section id="products" className="py-20 lg:py-28 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-md">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Discover New Arrivals</span>
              <h2 className="text-3xl font-bold tracking-tight text-secondary">Premium Collection</h2>
              <p className="text-gray-500 text-xs">Browse new releases and essential B2B stock featuring optimal thermal tolerances, SLS certification, and tactile operations.</p>
            </div>
            
            {/* Tabs & Filters */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeCategory === "all" ? 'bg-secondary text-white shadow-md' : 'bg-white border border-gray-100 text-gray-500 hover:text-secondary'
                }`}
              >
                All Products
              </button>
              {CATEGORIES.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    activeCategory === cat.id ? 'bg-secondary text-white shadow-md' : 'bg-white border border-gray-100 text-gray-500 hover:text-secondary'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-semibold">No products found matching the criteria.</p>
              <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} className="mt-4 text-xs font-bold text-primary underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((p) => {
                const isInWishlist = wishlist.some(item => item.id === p.id);
                return (
                  <motion.div
                    layout
                    whileHover={{ y: -8 }}
                    key={p.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all hover:shadow-xl"
                  >
                    
                    {/* Badge */}
                    <div className="absolute left-4 top-4 z-10 flex flex-col gap-1">
                      <span className="rounded-full bg-secondary/95 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                        {p.badge}
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button 
                      onClick={() => toggleWishlist(p)}
                      className={`absolute right-4 top-4 z-10 rounded-full p-2 shadow-sm transition-all ${
                        isInWishlist ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-white text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className="h-4.5 w-4.5" fill={isInWishlist ? "currentColor" : "none"} />
                    </button>

                    {/* Image Area */}
                    <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-gray-50">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Info Area */}
                    <div className="flex-1 space-y-2 p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{p.brand}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-primary fill-primary" />
                          <span className="text-[10px] font-bold text-secondary">{p.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-sm font-bold text-secondary leading-tight group-hover:text-primary transition-colors line-clamp-1">{p.name}</h3>
                      <p className="text-[11px] text-gray-400 line-clamp-2">{p.description}</p>
                      
                      <div className="flex items-baseline gap-2 pt-2">
                        <span className="text-sm font-extrabold text-secondary">Rs. {p.price.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400 line-through">Rs. {p.oldPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Add to Cart CTA */}
                    <div className="p-2 pt-4">
                      <button 
                        onClick={() => addToCart(p)}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-50 py-2.5 text-xs font-bold text-secondary transition-all hover:bg-primary active:scale-[0.98]"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* --- PROMOTIONAL BANNER --- */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-secondary to-gray-800 px-8 py-16 text-white shadow-xl md:px-16">
            
            {/* Glow Blobs */}
            <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
            
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <Percent className="h-3 w-3" /> Special B2B Wholesale Pricing
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl leading-tight">
                  Premium Switchboards &amp; Panels Bulk Deals
                </h2>
                <p className="text-gray-300 text-sm max-w-md">
                  Planning a residential complex or hotel setup? Get tailored bulk package quotes with dedicated dispatch coordination.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="rounded-xl bg-primary px-6 py-3.5 text-xs font-bold text-secondary shadow-md hover:bg-primary/95 transition-all"
                  >
                    Request B2B Quote
                  </button>
                  <button 
                    onClick={() => scrollToSection('products')}
                    className="rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    View Panels
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80" 
                  alt="Industrial Electrical Components" 
                  className="rounded-2xl h-64 w-full object-cover shadow-2xl border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BEST SELLERS --- */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Top Picks</span>
            <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Best Sellers</h2>
            <p className="text-gray-500 text-sm">Our most popular and trusted electrical accessories loved by Sri Lankan homes and electrical contractors.</p>
          </div>

          {/* Simple Carousel / Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.slice(0, 4).map((p) => (
              <div 
                key={`bs-${p.id}`}
                className="group border border-gray-100 bg-white p-3 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="h-44 w-full rounded-xl overflow-hidden bg-gray-50 mb-3">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="px-1 space-y-1">
                    <span className="text-[9px] font-bold text-primary tracking-widest uppercase">{p.brand}</span>
                    <h4 className="text-xs font-bold text-secondary line-clamp-1">{p.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-primary fill-primary" />
                      <span className="text-[10px] font-bold text-secondary">{p.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 px-1">
                  <span className="text-xs font-bold text-secondary">Rs. {p.price.toLocaleString()}</span>
                  <button 
                    onClick={() => addToCart(p)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 hover:bg-primary transition-all text-secondary"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED BRANDS --- */}
      <section className="py-12 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 md:grid-cols-6 items-center">
            {BRANDS.map((brand, i) => (
              <div 
                key={i}
                className="flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm grayscale hover:grayscale-0 transition-all duration-300 cursor-default"
              >
                <span className="text-lg font-bold text-primary">{brand.logo}</span>
                <span className="text-xs font-bold text-secondary tracking-tight">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Edge</span>
            <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Engineered for Reliability</h2>
            <p className="text-gray-500 text-sm">We combine global certifications with efficient operations to deliver top-tier electrical goods.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 space-y-4 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-secondary">Genuine Products</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Direct sourcing from authorized distributors ensures genuine SLS/CE components with standard warranties.</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 space-y-4 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-secondary">Same-day Dispatch</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Swift island-wide deliveries with express shipping channels for Metro Colombo coordinates.</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 space-y-4 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-secondary">Secure Payment</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Flexible transaction channels including bank transfer, cash, card systems, and flexible credit limits.</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 space-y-4 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-secondary">Warranty Support</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Up to 36 months of hassle-free exchange warranty cover directly handled via our retail store.</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-20 lg:py-28 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Customer Testimonials</span>
            <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed italic">"{t.text}"</p>
                </div>
                
                <div className="flex items-center gap-3 pt-6 border-t border-gray-50 mt-6">
                  <div className="h-10 w-10 rounded-full bg-primary/20 text-secondary flex items-center justify-center font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-secondary">{t.name}</h4>
                    <p className="text-[10px] text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER SECTION --- */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-xl px-4 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Stay In Touch</span>
          <h2 className="text-3xl font-bold tracking-tight text-secondary">Join Our Newsletter</h2>
          <p className="text-gray-400 text-xs">Receive inventory alerts, exclusive B2B wholesale discount codes, and premium guides to safe setups.</p>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (newsletterEmail) {
                setNewsletterSuccess(true);
                setNewsletterEmail("");
                setTimeout(() => setNewsletterSuccess(false), 5000);
              }
            }}
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-1.5 focus-within:border-primary focus-within:bg-white transition-all"
          >
            <input 
              type="email"
              placeholder="Enter your professional email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-transparent px-4 text-xs outline-none"
              required
            />
            <button 
              type="submit"
              className="rounded-xl bg-secondary px-6 py-2.5 text-xs font-bold text-white hover:bg-secondary/95"
            >
              Subscribe
            </button>
          </form>
          
          {newsletterSuccess && (
            <p className="text-xs font-semibold text-green-600">🎉 Successfully subscribed to Golden Electrical Newsletter!</p>
          )}
        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section id="about" className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" 
                alt="Golden Electrical Showroom Office" 
                className="rounded-[2rem] h-[340px] w-full object-cover shadow-lg"
              />
            </div>

            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">About Golden Electrical</span>
              <h2 className="text-3xl font-bold tracking-tight text-secondary">Serving Homes &amp; Industries Since 2018</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Golden Electrical Store is a premier B2B and retail hub based in Malwana, Sri Lanka. We facilitate supply chain setups for contractors, architects, and industrial builders, offering verified safety certifications.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                From luxury tempered glass smart panels and recessed ambient LED panels to thermal circuit protection devices, our products combine design aesthetics with performance.
              </p>
              
              <div className="flex gap-6">
                <div>
                  <h4 className="text-2xl font-black text-secondary">6+</h4>
                  <p className="text-xs text-gray-400 font-semibold">Years in Trade</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-secondary">100%</h4>
                  <p className="text-xs text-gray-400 font-semibold">SLS Certified</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-secondary"> Colombo </h4>
                  <p className="text-xs text-gray-400 font-semibold">Distribution Base</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CONTACT / GET QUOTE B2B FORM --- */}
      <section id="contact" className="py-20 lg:py-28 bg-gray-50/50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            
            {/* Contact details */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Get In Touch</span>
                <h2 className="text-3xl font-bold tracking-tight text-secondary">Contact Store</h2>
                <p className="text-gray-500 text-xs">Reach out to our sales coordination office in Malwana for wholesale deals and dispatch scheduling.</p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-gray-100 text-primary shadow-sm">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-secondary">Address</h4>
                    <p className="text-xs text-gray-400">636/H, Malwatha, Malwana, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-gray-100 text-primary shadow-sm">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-secondary">Hotline</h4>
                    <p className="text-xs text-gray-400"><a href="tel:+94775650625" className="hover:text-primary">+94 77 565 0625</a></p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-gray-100 text-primary shadow-sm">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-secondary">Mail Box</h4>
                    <p className="text-xs text-gray-400"><a href="mailto:sales@goldenelectrical.com" className="hover:text-primary">sales@goldenelectrical.com</a></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Request Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-secondary mb-6">Send Message / Request B2B Quote</h3>
              
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Your Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                      placeholder="e.g. Priyantha Silva"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Email Address <span className="text-red-500">*</span></label>
                    <input 
                      type="email"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                      placeholder="e.g. customer@example.com"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Contact Number</label>
                  <input 
                    type="tel"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                    placeholder="e.g. +94 77 123 4567"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Message / Product details <span className="text-red-500">*</span></label>
                  <textarea 
                    rows={4}
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                    placeholder="Describe your project, bulk requirements or list products..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs outline-none focus:border-primary focus:bg-white transition-all resize-none"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full rounded-xl bg-secondary py-3 text-xs font-bold text-white hover:bg-secondary/95 shadow-md active:scale-95 transition-all"
                >
                  Submit Inquiry
                </button>
              </form>

              {formSuccess && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 p-4 border border-green-200 text-green-700 text-xs">
                  <CheckCircle className="h-4 w-4" />
                  <span>Inquiry submitted successfully! We will coordinate a quote response within 24 hours.</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* --- PREMIUM FOOTER --- */}
      <footer className="bg-secondary text-gray-400 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            
            {/* Brand Intro */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-secondary font-bold">
                  ⚡
                </div>
                <span className="text-base font-bold text-white tracking-tight">Golden Electrical</span>
              </div>
              <p className="text-xs leading-relaxed max-w-xs text-gray-400">
                Premium electrical accessories designed for optimal safety, thermal performance, and contemporary design templates.
              </p>
              
              {/* Social Channels */}
              <div className="flex gap-3 pt-2">
                {['facebook', 'instagram', 'youtube', 'linkedin'].map((social) => (
                  <button 
                    key={social}
                    onClick={() => showToast(`Redirecting to ${social}`)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 text-gray-400 hover:text-white transition-all"
                  >
                    <span className="text-xs capitalize">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-all">Home</button></li>
                <li><button onClick={() => scrollToSection('products')} className="hover:text-white transition-all">Products</button></li>
                <li><button onClick={() => scrollToSection('categories')} className="hover:text-white transition-all">Categories</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-all">About Us</button></li>
              </ul>
            </div>

            {/* Catalog Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Categories</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setActiveCategory("lighting"); scrollToSection('products'); }} className="hover:text-white transition-all">Lighting</button></li>
                <li><button onClick={() => { setActiveCategory("switches"); scrollToSection('products'); }} className="hover:text-white transition-all">Switches</button></li>
                <li><button onClick={() => { setActiveCategory("wires & cables"); scrollToSection('products'); }} className="hover:text-white transition-all">Wires &amp; Cables</button></li>
                <li><button onClick={() => { setActiveCategory("fans"); scrollToSection('products'); }} className="hover:text-white transition-all">Fans</button></li>
              </ul>
            </div>

            {/* Contacts Info */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Info</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> +94 77 565 0625</li>
                <li className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> sales@goldenelectrical.com</li>
                <li className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Malwana, Sri Lanka</li>
              </ul>
            </div>

          </div>

          {/* Copyright Area */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-800 pt-8 mt-12 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} Golden Electrical Store. All Rights Reserved.</p>
            <p>Designed with ⚡ for B2B Retail Excellence</p>
          </div>
        </div>
      </footer>

      {/* --- CART DRAWER --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div>
                  <h3 className="text-base font-bold text-secondary">Shopping Cart</h3>
                  <p className="text-[10px] text-gray-400 font-semibold">{cartItemsCount} Items Selected</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full p-2 hover:bg-gray-50 text-gray-400 hover:text-secondary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <ShoppingCart className="h-12 w-12 text-gray-200" />
                    <p className="text-gray-400 text-sm font-semibold">Your cart is currently empty.</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); scrollToSection('products'); }}
                      className="rounded-xl bg-secondary px-5 py-2.5 text-xs font-bold text-white"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-xl border border-gray-100 items-center justify-between bg-gray-50/50">
                      <div className="h-16 w-16 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-secondary line-clamp-1">{item.name}</h4>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">{item.brand}</span>
                        <p className="text-xs font-extrabold text-secondary mt-1">Rs. {item.price.toLocaleString()}</p>
                      </div>
                      
                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-200 bg-white rounded-lg">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-50">-</button>
                          <span className="text-xs px-2 font-bold text-secondary">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-50">+</button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-100 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Est. Subtotal</span>
                    <span className="text-lg font-black text-secondary">Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      scrollToSection('contact');
                      setQuoteForm(prev => ({
                        ...prev,
                        message: `Hi, I would like to get a quote for the following items:\n${cart.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('\n')}`
                      }));
                      showToast("Cart products populated in contact form.");
                    }}
                    className="w-full rounded-xl bg-secondary py-3.5 text-xs font-bold text-white hover:bg-secondary/90 transition-all text-center"
                  >
                    Request Bulk Quote
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- WISHLIST DRAWER --- */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div>
                  <h3 className="text-base font-bold text-secondary">Your Wishlist</h3>
                  <p className="text-[10px] text-gray-400 font-semibold">{wishlist.length} Saved Products</p>
                </div>
                <button 
                  onClick={() => setIsWishlistOpen(false)}
                  className="rounded-full p-2 hover:bg-gray-50 text-gray-400 hover:text-secondary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <Heart className="h-12 w-12 text-gray-200" />
                    <p className="text-gray-400 text-sm font-semibold">Your wishlist is currently empty.</p>
                    <button 
                      onClick={() => { setIsWishlistOpen(false); scrollToSection('products'); }}
                      className="rounded-xl bg-secondary px-5 py-2.5 text-xs font-bold text-white"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div key={`wl-${item.id}`} className="flex gap-4 p-3 rounded-xl border border-gray-100 items-center justify-between bg-gray-50/50">
                      <div className="h-14 w-14 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-secondary line-clamp-1">{item.name}</h4>
                        <p className="text-xs font-extrabold text-secondary mt-1">Rs. {item.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            addToCart(item);
                            toggleWishlist(item);
                          }}
                          className="rounded-lg bg-primary px-3 py-1.5 text-[10px] font-bold text-secondary"
                        >
                          Add to Cart
                        </button>
                        <button 
                          onClick={() => toggleWishlist(item)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- FLOATING NOTIFICATION TOAST --- */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 rounded-full bg-secondary px-6 py-3 text-xs font-bold text-white shadow-xl flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING B2B SOCIAL ACTIONS --- */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3">
        <a 
          href="https://wa.me/94775650625?text=Hi!%20I%20would%20like%20to%20inquire%20about%20your%20electrical%20products." 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
          aria-label="WhatsApp Hotline"
        >
          <span className="text-xl">💬</span>
        </a>
      </div>

      {/* --- SCROLL TO TOP --- */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-100 text-secondary shadow-lg hover:scale-110 active:scale-95 transition-all hover:bg-gray-50"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

    </div>
  );
}
