import { useEffect, useMemo, useState } from "react";

const STORE_URL = "http://localhost:5000/api/store";

const navItems = [
  "Home",
  "Saved",
  "Electronics",
  "Motors",
  "Fashion",
  "Collectibles and Art",
  "Sports",
  "Health & Beauty",
  "Industrial equipment",
  "Home & Garden",
  "Deals",
  "Sell"
];

const categoryMap = {
  Electronics: "Electronics",
  Motors: "Motors",
  Fashion: "Fashion",
  "Collectibles and Art": "Collectibles",
  Sports: "Sports",
  "Health & Beauty": "Health & Beauty",
  "Industrial equipment": "Industrial equipment",
  "Home & Garden": "Home & Garden",
  Deals: "Deals"
};

const parseStored = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const svgToDataUrl = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const productArtwork = {
  "booster-box": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#ffd13d"/>
      <rect x="26" y="42" width="94" height="138" rx="18" fill="#176d4f"/>
      <rect x="40" y="54" width="66" height="90" rx="12" fill="#1f8a65"/>
      <circle cx="73" cy="98" r="22" fill="#ff9d4d"/>
      <rect x="140" y="32" width="56" height="150" rx="18" fill="#ffffff"/>
      <rect x="150" y="44" width="36" height="70" rx="10" fill="#3d68ff"/>
      <rect x="208" y="42" width="86" height="56" rx="18" fill="#ff81b8"/>
      <rect x="214" y="114" width="74" height="60" rx="18" fill="#111111"/>
      <circle cx="250" cy="72" r="16" fill="#fff"/>
      <circle cx="250" cy="144" r="14" fill="#ffd13d"/>
    </svg>
  `),
  speaker: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#5e5854"/>
      <rect x="84" y="28" width="152" height="164" rx="30" fill="#262220"/>
      <circle cx="160" cy="116" r="48" fill="#4f4742"/>
      <circle cx="160" cy="116" r="28" fill="#8d8179"/>
      <circle cx="160" cy="62" r="12" fill="#d7cfc9"/>
      <rect x="120" y="184" width="80" height="8" rx="4" fill="#1e1a18"/>
    </svg>
  `),
  sneaker: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#efefef"/>
      <path d="M48 146c24-6 50-34 84-34 22 0 42 13 58 28 17 15 33 18 50 18 13 0 20 9 20 18 0 12-8 20-21 20H70c-22 0-34-9-34-24 0-13 6-22 12-26z" fill="#f9f9f9"/>
      <path d="M104 119h48l38 24H92z" fill="#d5d5d5"/>
      <path d="M56 165h182" stroke="#b4b4b4" stroke-width="10" stroke-linecap="round"/>
      <path d="M134 109l25 23m-48-14l22 14m-38-5l19 8" stroke="#999" stroke-width="5" stroke-linecap="round"/>
    </svg>
  `),
  bag: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#e57f88"/>
      <rect x="76" y="74" width="168" height="102" rx="20" fill="#cd4455"/>
      <path d="M120 92c0-27 14-43 40-43s40 16 40 43" fill="none" stroke="#4a1b20" stroke-width="10" stroke-linecap="round"/>
      <rect x="100" y="94" width="120" height="76" rx="16" fill="#de5b68"/>
      <circle cx="124" cy="110" r="6" fill="#f9d7d9"/>
      <circle cx="196" cy="110" r="6" fill="#f9d7d9"/>
    </svg>
  `),
  watch: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#c8c8c8"/>
      <rect x="136" y="16" width="48" height="52" rx="14" fill="#767676"/>
      <rect x="136" y="152" width="48" height="52" rx="14" fill="#767676"/>
      <circle cx="160" cy="110" r="54" fill="#232323"/>
      <circle cx="160" cy="110" r="44" fill="#f1f1f1"/>
      <path d="M160 110V81" stroke="#232323" stroke-width="8" stroke-linecap="round"/>
      <path d="M160 110h22" stroke="#232323" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `),
  fashion: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#ead0c8"/>
      <path d="M132 56c8 13 18 19 28 19s20-6 28-19l30 27-16 21v72H118v-72L102 83z" fill="#f8f0ed"/>
      <path d="M160 75v101" stroke="#d8c0b6" stroke-width="6"/>
      <circle cx="160" cy="42" r="16" fill="#282828"/>
      <path d="M105 176h110" stroke="#c5a79d" stroke-width="10" stroke-linecap="round"/>
    </svg>
  `),
  wheel: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#d8dee6"/>
      <circle cx="160" cy="110" r="72" fill="#3f4650"/>
      <circle cx="160" cy="110" r="50" fill="#9ea7b4"/>
      <circle cx="160" cy="110" r="20" fill="#2a3037"/>
      <path d="M160 58v104M108 84l104 52M108 136l104-52" stroke="#cfd6de" stroke-width="10" stroke-linecap="round"/>
    </svg>
  `),
  "deal-box": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#e7ae29"/>
      <path d="M76 92l84-38 84 38-84 42z" fill="#f6cb5d"/>
      <path d="M76 92v66l84 44v-68z" fill="#d89412"/>
      <path d="M244 92v66l-84 44v-68z" fill="#c9820c"/>
      <path d="M160 54v148" stroke="#9f6200" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `),
  "sport-ball": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#8bc6ff"/>
      <circle cx="160" cy="110" r="72" fill="#ffffff"/>
      <path d="M160 38c20 18 33 44 33 72s-13 54-33 72c-20-18-33-44-33-72s13-54 33-72z" fill="#111"/>
      <path d="M90 68c22 3 39 14 52 30-16 10-28 25-35 44-17-8-31-21-41-38 3-13 12-26 24-36z" fill="#111"/>
      <path d="M230 68c-22 3-39 14-52 30 16 10 28 25 35 44 17-8 31-21 41-38-3-13-12-26-24-36z" fill="#111"/>
    </svg>
  `),
  "beauty-kit": svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#ffd8dd"/>
      <rect x="74" y="58" width="44" height="108" rx="14" fill="#fff"/>
      <rect x="82" y="44" width="28" height="22" rx="8" fill="#f6b7bf"/>
      <rect x="136" y="44" width="56" height="122" rx="16" fill="#fff3f4"/>
      <rect x="206" y="72" width="40" height="94" rx="14" fill="#fff"/>
      <circle cx="164" cy="104" r="16" fill="#ff9dad"/>
      <rect x="144" y="126" width="40" height="12" rx="6" fill="#ffbdc8"/>
    </svg>
  `),
  drill: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#cfd8df"/>
      <rect x="78" y="76" width="118" height="48" rx="18" fill="#3b4650"/>
      <rect x="194" y="86" width="52" height="26" rx="10" fill="#f5b000"/>
      <rect x="238" y="92" width="36" height="14" rx="7" fill="#6c747c"/>
      <path d="M120 124h42v54c0 10-8 18-18 18h-6c-10 0-18-8-18-18z" fill="#f5b000"/>
      <rect x="108" y="138" width="22" height="12" rx="6" fill="#2c3136"/>
    </svg>
  `),
  blender: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <rect width="320" height="220" rx="28" fill="#d8ebb4"/>
      <path d="M118 40h84l-12 88h-60z" fill="#ffffff"/>
      <rect x="126" y="128" width="68" height="20" rx="10" fill="#c9d6c4"/>
      <rect x="122" y="148" width="76" height="42" rx="18" fill="#4f7d45"/>
      <circle cx="160" cy="169" r="9" fill="#d8ebb4"/>
      <path d="M138 64h44" stroke="#b7d39a" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `)
};

const categoryArtwork = {
  Motors: productArtwork.wheel,
  Collectibles: productArtwork["booster-box"],
  Fashion: productArtwork.fashion,
  Sneakers: productArtwork.sneaker,
  Watches: productArtwork.watch,
  Bags: productArtwork.bag,
  Deals: productArtwork["deal-box"]
};

const heroSlides = [
  {
    title: "Discover a kaleidoscope of cards",
    text: "Build your collection of trading cards and collectible finds with weekly premium drops.",
    buttonLabel: "Find your favorites",
    category: "Collectibles",
    accent: "yellow",
    productKey: "booster-box"
  },
  {
    title: "Fresh fashion and iconic accessories",
    text: "Shop statement pieces, runway-inspired bags, and everyday staples with premium styling.",
    buttonLabel: "Explore fashion",
    category: "Fashion",
    accent: "rose",
    productKey: "fashion"
  },
  {
    title: "Best deals for the whole cart",
    text: "Score fast-moving discounts on watches, sneakers, and marketplace bundles before they are gone.",
    buttonLabel: "Browse deals",
    category: "Deals",
    accent: "sky",
    productKey: "deal-box"
  }
];

const popularCategories = [
  { name: "Motors", color: "silver" },
  { name: "Collectibles", color: "violet" },
  { name: "Fashion", color: "blush" },
  { name: "Sneakers", color: "cloud" },
  { name: "Watches", color: "ash" },
  { name: "Bags", color: "rose" },
  { name: "Deals", color: "gold" }
];

const benefits = [
  "Free shipping on selected orders",
  "Live order tracking across every page",
  "Responsive layout for mobile, tablet, and desktop"
];

const fallbackProducts = [
  {
    id: 1,
    name: "Galaxy Booster Box",
    tagline: "Rare holographic pulls and tournament-ready decks",
    category: "Collectibles",
    price: 89,
    originalPrice: 109,
    rating: 4.9,
    reviews: 182,
    badge: "Bestseller",
    gradient: "linear-gradient(135deg, #ffd77a, #ff8d3a)",
    imageKey: "booster-box",
    shipping: "Free delivery tomorrow",
    stock: 14,
    description:
      "A premium booster box packed with special-art cards, foil variants, and collector-grade packaging.",
    features: ["24 sealed packs", "Limited print run", "Collector sleeves included"]
  },
  {
    id: 2,
    name: "Pulse Audio Speaker",
    tagline: "Compact room-filling sound with bold desk style",
    category: "Electronics",
    price: 129,
    originalPrice: 149,
    rating: 4.8,
    reviews: 96,
    badge: "Fresh drop",
    gradient: "linear-gradient(135deg, #58504b, #8f857d)",
    imageKey: "speaker",
    shipping: "Ships in 24 hours",
    stock: 22,
    description:
      "A modern wireless speaker with rich low-end, crisp vocals, and an apartment-friendly footprint.",
    features: ["20 hour battery", "USB-C fast charge", "Stereo pairing"]
  },
  {
    id: 3,
    name: "Aero Street Runner",
    tagline: "Cushioned comfort with sleek everyday styling",
    category: "Sneakers",
    price: 249,
    originalPrice: 279,
    rating: 4.7,
    reviews: 214,
    badge: "Trending",
    gradient: "linear-gradient(135deg, #f4f4f4, #cfcfcf)",
    imageKey: "sneaker",
    shipping: "Free returns within 7 days",
    stock: 9,
    description:
      "Feather-light runners with sculpted soles and breathable knit uppers built for all-day wear.",
    features: ["Memory foam insole", "Reflective heel pull", "Water-resistant finish"]
  },
  {
    id: 4,
    name: "Verve Signature Bag",
    tagline: "Structured design with soft-touch premium finish",
    category: "Bags",
    price: 64,
    originalPrice: 82,
    rating: 4.8,
    reviews: 133,
    badge: "Studio edit",
    gradient: "linear-gradient(135deg, #f39aa2, #d55f67)",
    imageKey: "bag",
    shipping: "Free monogram on checkout",
    stock: 17,
    description:
      "A statement shoulder bag with polished hardware, roomy compartments, and all-day versatility.",
    features: ["Vegan leather", "Magnetic closure", "Adjustable strap"]
  },
  {
    id: 5,
    name: "Chrono Steel Watch",
    tagline: "Minimal chronograph styling with everyday durability",
    category: "Watches",
    price: 156,
    originalPrice: 189,
    rating: 4.9,
    reviews: 75,
    badge: "Limited",
    gradient: "linear-gradient(135deg, #d9d9d9, #ababab)",
    imageKey: "watch",
    shipping: "Express insured shipping",
    stock: 6,
    description:
      "A brushed steel chronograph with sapphire crystal, luminous hands, and clean marketplace appeal.",
    features: ["50m water resistance", "Sapphire crystal", "Quick-release strap"]
  },
  {
    id: 6,
    name: "Runway Satin Set",
    tagline: "Soft evening-ready styling with elevated details",
    category: "Fashion",
    price: 72,
    originalPrice: 95,
    rating: 4.6,
    reviews: 58,
    badge: "Popular",
    gradient: "linear-gradient(135deg, #efd7ca, #e9bfd3)",
    imageKey: "fashion",
    shipping: "Popular in your region",
    stock: 31,
    description:
      "A coordinated fashion set designed with fluid drape, subtle sheen, and premium finishing touches.",
    features: ["Tailored fit", "Machine washable", "Limited seasonal colors"]
  },
  {
    id: 7,
    name: "Turbo Alloy Wheel",
    tagline: "Performance-inspired finish for standout builds",
    category: "Motors",
    price: 199,
    originalPrice: 235,
    rating: 4.8,
    reviews: 48,
    badge: "Top rated",
    gradient: "linear-gradient(135deg, #d7dde7, #a7afbb)",
    imageKey: "wheel",
    shipping: "Fits most mid-size sedans",
    stock: 11,
    description:
      "A precision-cut alloy wheel with a performance look, balanced weight, and corrosion-resistant finish.",
    features: ["18 inch fitment", "Road-tested finish", "Mounting hardware included"]
  },
  {
    id: 8,
    name: "Mystery Deal Crate",
    tagline: "Surprise bundle packed with trending picks and savings",
    category: "Deals",
    price: 49,
    originalPrice: 79,
    rating: 4.5,
    reviews: 201,
    badge: "Flash sale",
    gradient: "linear-gradient(135deg, #f3c24e, #d89b16)",
    imageKey: "deal-box",
    shipping: "Ships free with 2+ items",
    stock: 42,
    description:
      "A rotating bundle of customer favorites, collector extras, and surprise premium finds at a steep discount.",
    features: ["New mix each week", "Extra bonus item", "Gift-ready packaging"]
  },
  {
    id: 9,
    name: "Pro Match Football",
    tagline: "Training-grade grip and tournament-ready flight",
    category: "Sports",
    price: 39,
    originalPrice: 52,
    rating: 4.7,
    reviews: 88,
    badge: "Fan favorite",
    gradient: "linear-gradient(135deg, #d9f0ff, #8ec8ff)",
    imageKey: "sport-ball",
    shipping: "Ships in 24 hours",
    stock: 28,
    description:
      "A pro-level football built for strong control, lasting shape retention, and consistent game-day feel.",
    features: ["FIFA size 5", "Durable stitched panels", "All-weather finish"]
  },
  {
    id: 10,
    name: "Glow Skin Kit",
    tagline: "Daily care essentials for a bright healthy routine",
    category: "Health & Beauty",
    price: 58,
    originalPrice: 74,
    rating: 4.8,
    reviews: 127,
    badge: "Daily care",
    gradient: "linear-gradient(135deg, #ffe0ea, #ffd0b0)",
    imageKey: "beauty-kit",
    shipping: "Dermat-approved best seller",
    stock: 36,
    description:
      "A skincare bundle featuring cleanser, serum, and hydration cream designed for an easy everyday routine.",
    features: ["Vitamin C serum", "Gentle cleanser", "Travel-ready kit"]
  },
  {
    id: 11,
    name: "Torque Drill Max",
    tagline: "Reliable industrial drilling power for tough jobs",
    category: "Industrial equipment",
    price: 214,
    originalPrice: 249,
    rating: 4.6,
    reviews: 41,
    badge: "Workshop pick",
    gradient: "linear-gradient(135deg, #d7dde2, #8e9aa6)",
    imageKey: "drill",
    shipping: "Heavy-duty shipping included",
    stock: 8,
    description:
      "A compact high-torque drill designed for workshop accuracy, long runtime, and job-site durability.",
    features: ["Brushless motor", "2 battery pack", "Steel carrying case"]
  },
  {
    id: 12,
    name: "Nest Smart Blender",
    tagline: "Countertop power with clean kitchen styling",
    category: "Home & Garden",
    price: 94,
    originalPrice: 119,
    rating: 4.7,
    reviews: 64,
    badge: "Kitchen choice",
    gradient: "linear-gradient(135deg, #e7f1dd, #bddb9e)",
    imageKey: "blender",
    shipping: "Free kitchen setup guide",
    stock: 19,
    description:
      "A sleek blender with multi-speed control, durable blades, and a compact profile for modern kitchens.",
    features: ["Pulse mode", "Dishwasher-safe jar", "Quiet motor housing"]
  }
];

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => parseStored("lumacart-cart", []));
  const [savedIds, setSavedIds] = useState(() => parseStored("lumacart-saved", []));
  const [orders, setOrders] = useState(() => parseStored("lumacart-orders", []));
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    payment: "Cash on delivery"
  });
  const [checkoutError, setCheckoutError] = useState("");
  const [sellForm, setSellForm] = useState({
    shopName: "",
    email: "",
    niche: "",
    notes: ""
  });
  const [sellSubmitted, setSellSubmitted] = useState(false);
  const [userSession, setUserSession] = useState(() =>
    parseStored("lumacart-user-session", null)
  );
  const [adminSession, setAdminSession] = useState(() =>
    parseStored("lumacart-admin-session", null)
  );
  const [authForm, setAuthForm] = useState({
    userEmail: "",
    userPassword: "",
    adminEmail: "",
    adminPassword: ""
  });
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    async function loadStore() {
      try {
        const response = await fetch(STORE_URL);
        if (!response.ok) {
          throw new Error("Store API unavailable");
        }
        const data = await response.json();
        const decoratedProducts = data.products.map((product) => ({
          ...product,
          image: productArtwork[product.imageKey] ?? productArtwork["deal-box"]
        }));
        setProducts(decoratedProducts);
        setCategories(["All", ...data.categories]);
      } catch (error) {
        console.error("Failed to load store data", error);
        const decoratedFallback = fallbackProducts.map((product) => ({
          ...product,
          image: productArtwork[product.imageKey] ?? productArtwork["deal-box"]
        }));
        setProducts(decoratedFallback);
        setCategories([
          "All",
          ...new Set(decoratedFallback.map((product) => product.category))
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadStore();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lumacart-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem("lumacart-saved", JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    window.localStorage.setItem("lumacart-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    window.localStorage.setItem("lumacart-user-session", JSON.stringify(userSession));
  }, [userSession]);

  useEffect(() => {
    window.localStorage.setItem("lumacart-admin-session", JSON.stringify(adminSession));
  }, [adminSession]);

  useEffect(() => {
    if (!statusMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => setStatusMessage(""), 2200);
    return () => window.clearTimeout(timer);
  }, [statusMessage]);

  useEffect(() => {
    if (activeView !== "home") {
      return undefined;
    }

    const sliderTimer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(sliderTimer);
  }, [activeView]);

  const savedProducts = useMemo(
    () => products.filter((product) => savedIds.includes(product.id)),
    [products, savedIds]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, products, search]);

  const dealProducts = useMemo(
    () => products.filter((product) => product.originalPrice > product.price),
    [products]
  );

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);

  const cartSummary = useMemo(() => {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const savings = cart.reduce(
      (sum, item) => sum + item.quantity * (item.originalPrice - item.price),
      0
    );
    const shipping = itemCount === 0 || subtotal > 180 ? 0 : 14;
    const total = subtotal + shipping;

    return {
      itemCount,
      subtotal,
      savings,
      shipping,
      total
    };
  }, [cart]);

  function showMessage(message) {
    setStatusMessage(message);
  }

  function goToView(view) {
    setActiveView(view);
    setAuthError("");
    if (view !== "checkout") {
      setCheckoutError("");
    }
  }

  function handleNavigation(item) {
    if (item === "Home") {
      setActiveCategory("All");
      goToView("home");
      return;
    }

    if (item === "Saved") {
      goToView("saved");
      return;
    }

    if (item === "Sell") {
      goToView("sell");
      return;
    }

    if (item === "Deals") {
      setActiveCategory("Deals");
      goToView("deals");
      return;
    }

    const mappedCategory = categoryMap[item];
    setActiveCategory(mappedCategory ?? "All");
    goToView("shop");
    if (!mappedCategory || mappedCategory === "All") {
      showMessage(`${item} collection is now open`);
    }
  }

  function selectCategory(category) {
    setActiveCategory(category);
    setActiveView("shop");
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1
        }
      ];
    });
    showMessage(`${product.name} added to cart`);
  }

  function updateQuantity(productId, delta) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.id !== productId));
  }

  function toggleSaved(productId) {
    setSavedIds((current) => {
      const exists = current.includes(productId);
      showMessage(exists ? "Removed from saved items" : "Added to saved items");
      return exists
        ? current.filter((id) => id !== productId)
        : [...current, productId];
    });
  }

  function startCheckout() {
    if (!cart.length) {
      showMessage("Add something to the cart first");
      return;
    }

    goToView("checkout");
  }

  function submitOrder(event) {
    event.preventDefault();

    if (!checkoutForm.fullName || !checkoutForm.email || !checkoutForm.address) {
      setCheckoutError("Please fill in your name, email, and delivery address.");
      return;
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      placedAt: new Date().toLocaleString(),
      total: cartSummary.total,
      items: cart
    };

    setOrders((current) => [newOrder, ...current]);
    setCart([]);
    setCheckoutError("");
    setCheckoutForm({
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      payment: "Cash on delivery"
    });
    setActiveView("orders");
    showMessage("Order placed successfully");
  }

  function submitSellerForm(event) {
    event.preventDefault();
    if (!sellForm.shopName || !sellForm.email || !sellForm.niche) {
      showMessage("Please complete the seller form");
      return;
    }

    setSellSubmitted(true);
    setSellForm({
      shopName: "",
      email: "",
      niche: "",
      notes: ""
    });
  }

  function submitUserLogin(event) {
    event.preventDefault();
    if (!authForm.userEmail || !authForm.userPassword) {
      setAuthError("Enter your email and password.");
      return;
    }

    setUserSession({
      name: authForm.userEmail.split("@")[0],
      email: authForm.userEmail
    });
    setAuthForm((current) => ({ ...current, userPassword: "" }));
    setActiveView("home");
    showMessage("User login successful");
  }

  function submitAdminLogin(event) {
    event.preventDefault();
    if (!authForm.adminEmail || !authForm.adminPassword) {
      setAuthError("Enter admin email and password.");
      return;
    }

    setAdminSession({
      email: authForm.adminEmail
    });
    setAuthForm((current) => ({ ...current, adminPassword: "" }));
    setActiveView("admin");
    showMessage("Admin login successful");
  }

  function logoutUser() {
    setUserSession(null);
    showMessage("User signed out");
  }

  function logoutAdmin() {
    setAdminSession(null);
    if (activeView === "admin") {
      setActiveView("home");
    }
    showMessage("Admin signed out");
  }

  function openProduct(product) {
    setSelectedProduct(product);
  }

  function closeProduct() {
    setSelectedProduct(null);
  }

  function moveHero(direction) {
    setHeroIndex((current) => {
      const nextIndex = (current + direction + heroSlides.length) % heroSlides.length;
      return nextIndex;
    });
  }

  const heroSlide = heroSlides[heroIndex];

  function renderHeader() {
    return (
      <header className="market-header">
        <div className="header-primary">
          <button
            type="button"
            className="brand-lockup button-reset"
            onClick={() => handleNavigation("Home")}
          >
            <span className="brand-word brand-red">L</span>
            <span className="brand-word brand-blue">u</span>
            <span className="brand-word brand-yellow">m</span>
            <span className="brand-word brand-green">a</span>
            <span className="brand-title">Cart</span>
          </button>

          <label className="search-shell">
            <span>Search</span>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for products, categories, or styles"
            />
          </label>

          <div className="header-actions">
            {userSession ? (
              <button type="button" className="header-chip" onClick={logoutUser}>
                {userSession.name} Logout
              </button>
            ) : (
              <button type="button" className="header-chip" onClick={() => goToView("userLogin")}>
                User Login
              </button>
            )}
            {adminSession ? (
              <button type="button" className="header-chip" onClick={() => goToView("admin")}>
                Admin Panel
              </button>
            ) : (
              <button type="button" className="header-chip" onClick={() => goToView("adminLogin")}>
                Admin Login
              </button>
            )}
            <button type="button" className="header-chip" onClick={() => goToView("saved")}>
              Saved {savedIds.length}
            </button>
            <button type="button" className="header-chip" onClick={() => goToView("orders")}>
              Orders {orders.length}
            </button>
            <button type="button" className="cart-pill" onClick={() => goToView("cart")}>
              <span>{cartSummary.itemCount} items</span>
              <strong>${cartSummary.total.toFixed(2)}</strong>
            </button>
          </div>
        </div>

        <nav className="nav-strip">
          {navItems.map((item) => {
            const isActive =
              (activeView === "home" && item === "Home") ||
              (activeView === "saved" && item === "Saved") ||
              (activeView === "sell" && item === "Sell") ||
              (activeView === "deals" && item === "Deals") ||
              (activeView === "shop" && categoryMap[item] === activeCategory);

            return (
              <button
                key={item}
                type="button"
                className={isActive ? "nav-link active" : "nav-link"}
                onClick={() => handleNavigation(item)}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {statusMessage ? <div className="status-banner">{statusMessage}</div> : null}
      </header>
    );
  }

  function renderHero() {
    return (
      <section className={`promo-banner ${heroSlide.accent}`}>
        <div className="promo-copy">
          <span className="eyebrow">Marketplace spotlight</span>
          <h1>{heroSlide.title}</h1>
          <p>{heroSlide.text}</p>
          <div className="hero-actions">
            <button
              type="button"
              className="primary-button"
              onClick={() => selectCategory(heroSlide.category)}
            >
              {heroSlide.buttonLabel}
            </button>
            <button type="button" className="ghost-button" onClick={() => moveHero(1)}>
              Next feature
            </button>
          </div>
        </div>

        <div className="promo-stage">
          <button type="button" className="hero-arrow" onClick={() => moveHero(-1)}>
            Prev
          </button>
          <div className="hero-collage">
            {featuredProducts.map((product, index) => (
              <article
                key={product.id}
                className={`hero-card hero-card-${index + 1}`}
                onClick={() => openProduct(product)}
              >
                <img src={product.image} alt={product.name} />
              </article>
            ))}
            <div className="hero-focus">
              <img
                src={productArtwork[heroSlide.productKey]}
                alt={heroSlide.title}
              />
            </div>
          </div>
          <button type="button" className="hero-arrow" onClick={() => moveHero(1)}>
            Next
          </button>
        </div>
      </section>
    );
  }

  function renderCategories() {
    return (
      <section className="category-showcase">
        <div className="section-heading">
          <h2>Explore Popular Categories</h2>
          <button type="button" className="text-link" onClick={() => goToView("shop")}>
            See all
          </button>
        </div>

        <div className="circle-grid">
          {popularCategories.map((category) => (
            <button
              type="button"
              key={category.name}
              className="circle-card button-reset"
              onClick={() => selectCategory(category.name)}
            >
              <div className={`circle-art ${category.color}`}>
                <img src={categoryArtwork[category.name]} alt={category.name} />
              </div>
              <h3>{category.name}</h3>
            </button>
          ))}
        </div>
      </section>
    );
  }

  function renderCatalog(items, title, subtitle) {
    return (
      <section className="catalog-panel" id="catalog">
        <div className="catalog-toolbar">
          <div>
            <span className="eyebrow">{subtitle}</span>
            <h2>{title}</h2>
          </div>

          <div className="toolbar-actions">
            <button type="button" className="chip" onClick={() => setSearch("")}>
              Clear search
            </button>
            <button type="button" className="chip" onClick={() => setActiveCategory("All")}>
              All categories
            </button>
          </div>
        </div>

        <div className="category-row">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={category === activeCategory ? "chip active" : "chip"}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="value-strip">
          {benefits.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        {loading ? (
          <div className="empty-state">Loading the collection...</div>
        ) : items.length ? (
          <div className="product-grid">
            {items.map((product) => (
              <article className="product-card" key={product.id}>
                <button
                  type="button"
                  className="product-image button-reset"
                  style={{ background: product.gradient }}
                  onClick={() => openProduct(product)}
                >
                  <span>{product.badge}</span>
                  <img src={product.image} alt={product.name} />
                </button>

                <div className="product-meta">
                  <div className="product-heading">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.tagline}</p>
                    </div>
                    <div className="price-stack">
                      <strong>${product.price}</strong>
                      <small>${product.originalPrice}</small>
                    </div>
                  </div>

                  <div className="product-metrics">
                    <span>{product.category}</span>
                    <span>{product.rating} rating</span>
                    <span>{product.shipping}</span>
                  </div>

                  <div className="product-footer">
                    <button type="button" onClick={() => addToCart(product)}>
                      Add to cart
                    </button>
                    <button
                      type="button"
                      className={savedIds.includes(product.id) ? "ghost-button active" : "ghost-button"}
                      onClick={() => toggleSaved(product.id)}
                    >
                      {savedIds.includes(product.id) ? "Saved" : "Save"}
                    </button>
                    <button type="button" className="text-link" onClick={() => openProduct(product)}>
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No products match this search. Try another category or keyword.
          </div>
        )}
      </section>
    );
  }

  function renderSidePanel() {
    return (
      <aside className="side-panel">
        <section className="cart-panel">
          <div className="cart-header">
            <span className="eyebrow">Cart summary</span>
            <h2>Your picks</h2>
          </div>

          <div className="summary-grid">
            <div className="summary-line">
              <span>Items</span>
              <strong>{cartSummary.itemCount}</strong>
            </div>
            <div className="summary-line">
              <span>Savings</span>
              <strong>${cartSummary.savings.toFixed(2)}</strong>
            </div>
            <div className="summary-line">
              <span>Total</span>
              <strong>${cartSummary.total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="mini-cart-list">
            {cart.length ? (
              cart.slice(0, 3).map((item) => (
                <article className="mini-cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      {item.quantity} x ${item.price}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-cart">
                <p>Your cart is empty.</p>
                <span>Add products to see your running total here.</span>
              </div>
            )}
          </div>

          <button type="button" className="primary-button full-width" onClick={() => goToView("cart")}>
            Open cart
          </button>
          <button type="button" className="ghost-button full-width" onClick={startCheckout}>
            Checkout now
          </button>
        </section>

        <section className="insight-card">
          <span className="eyebrow">Saved items</span>
          <h2>{savedProducts.length} favorites ready</h2>
          <p>Build a shortlist, compare styles, and move top picks straight into checkout.</p>
          <button type="button" className="text-link" onClick={() => goToView("saved")}>
            Open saved page
          </button>
        </section>
      </aside>
    );
  }

  function renderHome() {
    return (
      <>
        {renderHero()}
        {renderCategories()}

        <section className="trend-strip">
          {dealProducts.slice(0, 3).map((product) => (
            <article className="trend-card" key={product.id}>
              <div className="trend-copy">
                <span className="eyebrow">{product.badge}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <button type="button" className="text-link" onClick={() => openProduct(product)}>
                  View details
                </button>
              </div>
              <img src={product.image} alt={product.name} />
            </article>
          ))}
        </section>

        <section className="content-grid">
          {renderCatalog(filteredProducts, "Featured products", "Shop the catalog")}
          {renderSidePanel()}
        </section>
      </>
    );
  }

  function renderSavedPage() {
    return (
      <section className="page-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Saved collection</span>
            <h2>Your favorite items</h2>
          </div>
          <button type="button" className="primary-button" onClick={() => goToView("home")}>
            Keep shopping
          </button>
        </div>

        {savedProducts.length ? (
          <div className="saved-grid">
            {savedProducts.map((product) => (
              <article className="saved-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.tagline}</p>
                  <div className="saved-actions">
                    <button type="button" onClick={() => addToCart(product)}>
                      Add to cart
                    </button>
                    <button type="button" className="ghost-button" onClick={() => openProduct(product)}>
                      Details
                    </button>
                    <button type="button" className="text-link" onClick={() => toggleSaved(product.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            You have not saved anything yet. Use the Save button on any product card.
          </div>
        )}
      </section>
    );
  }

  function renderCartPage() {
    return (
      <section className="page-card cart-page">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Shopping cart</span>
            <h2>Review your bag</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => goToView("home")}>
            Continue shopping
          </button>
        </div>

        <div className="cart-layout">
          <div className="cart-list">
            {cart.length ? (
              cart.map((item) => (
                <article className="cart-item full" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-copy">
                    <h3>{item.name}</h3>
                    <p>{item.tagline}</p>
                    <span>{item.shipping}</span>
                  </div>
                  <div className="quantity-controls">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                  <strong>${(item.quantity * item.price).toFixed(2)}</strong>
                  <button type="button" className="text-link" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </article>
              ))
            ) : (
              <div className="empty-state">Your cart is empty right now.</div>
            )}
          </div>

          <aside className="checkout-card">
            <div className="checkout-row">
              <span>Subtotal</span>
              <strong>${cartSummary.subtotal.toFixed(2)}</strong>
            </div>
            <div className="checkout-row">
              <span>Shipping</span>
              <strong>${cartSummary.shipping.toFixed(2)}</strong>
            </div>
            <div className="checkout-row">
              <span>You save</span>
              <strong>${cartSummary.savings.toFixed(2)}</strong>
            </div>
            <div className="checkout-row total">
              <span>Total</span>
              <strong>${cartSummary.total.toFixed(2)}</strong>
            </div>
            <button type="button" className="primary-button full-width" onClick={startCheckout}>
              Proceed to checkout
            </button>
          </aside>
        </div>
      </section>
    );
  }

  function renderCheckoutPage() {
    return (
      <section className="page-card checkout-page">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Checkout</span>
            <h2>Complete your order</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => goToView("cart")}>
            Back to cart
          </button>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submitOrder}>
            <label>
              Full name
              <input
                type="text"
                value={checkoutForm.fullName}
                onChange={(event) =>
                  setCheckoutForm((current) => ({
                    ...current,
                    fullName: event.target.value
                  }))
                }
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={checkoutForm.email}
                onChange={(event) =>
                  setCheckoutForm((current) => ({
                    ...current,
                    email: event.target.value
                  }))
                }
              />
            </label>
            <label>
              Address
              <input
                type="text"
                value={checkoutForm.address}
                onChange={(event) =>
                  setCheckoutForm((current) => ({
                    ...current,
                    address: event.target.value
                  }))
                }
              />
            </label>
            <div className="form-row">
              <label>
                City
                <input
                  type="text"
                  value={checkoutForm.city}
                  onChange={(event) =>
                    setCheckoutForm((current) => ({
                      ...current,
                      city: event.target.value
                    }))
                  }
                />
              </label>
              <label>
                Postal code
                <input
                  type="text"
                  value={checkoutForm.postalCode}
                  onChange={(event) =>
                    setCheckoutForm((current) => ({
                      ...current,
                      postalCode: event.target.value
                    }))
                  }
                />
              </label>
            </div>
            <label>
              Payment method
              <select
                value={checkoutForm.payment}
                onChange={(event) =>
                  setCheckoutForm((current) => ({
                    ...current,
                    payment: event.target.value
                  }))
                }
              >
                <option>Cash on delivery</option>
                <option>Card on delivery</option>
                <option>UPI payment</option>
              </select>
            </label>

            {checkoutError ? <p className="error-text">{checkoutError}</p> : null}

            <button type="submit" className="primary-button full-width">
              Place order
            </button>
          </form>

          <aside className="checkout-card">
            <h3>Order summary</h3>
            {cart.map((item) => (
              <div className="checkout-row" key={item.id}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
            <div className="checkout-row total">
              <span>Total</span>
              <strong>${cartSummary.total.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  function renderOrdersPage() {
    return (
      <section className="page-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Orders</span>
            <h2>Your recent purchases</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => goToView("home")}>
            Back to home
          </button>
        </div>

        {orders.length ? (
          <div className="orders-grid">
            {orders.map((order) => (
              <article className="order-card" key={order.id}>
                <div className="checkout-row">
                  <strong>{order.id}</strong>
                  <span>{order.placedAt}</span>
                </div>
                <p>{order.items.length} items in this order</p>
                <div className="order-items">
                  {order.items.map((item) => (
                    <span key={item.id}>
                      {item.name} x {item.quantity}
                    </span>
                  ))}
                </div>
                <div className="checkout-row total">
                  <span>Total paid</span>
                  <strong>${order.total.toFixed(2)}</strong>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No orders yet. Add products to cart and complete checkout to see them here.
          </div>
        )}
      </section>
    );
  }

  function renderSellPage() {
    return (
      <section className="page-card seller-page">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Seller hub</span>
            <h2>Start selling on LumaCart</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => goToView("home")}>
            Back to storefront
          </button>
        </div>

        <div className="seller-layout">
          <div className="seller-copy">
            <h3>Reach buyers with a polished marketplace storefront.</h3>
            <ul className="feature-list">
              <li>Create listings with strong imagery and clear pricing.</li>
              <li>Track orders and customer interest in one place.</li>
              <li>Offer deals, build saved-item momentum, and grow repeat sales.</li>
            </ul>
          </div>

          <form className="checkout-form" onSubmit={submitSellerForm}>
            <label>
              Shop name
              <input
                type="text"
                value={sellForm.shopName}
                onChange={(event) =>
                  setSellForm((current) => ({
                    ...current,
                    shopName: event.target.value
                  }))
                }
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={sellForm.email}
                onChange={(event) =>
                  setSellForm((current) => ({
                    ...current,
                    email: event.target.value
                  }))
                }
              />
            </label>
            <label>
              Product niche
              <input
                type="text"
                value={sellForm.niche}
                onChange={(event) =>
                  setSellForm((current) => ({
                    ...current,
                    niche: event.target.value
                  }))
                }
              />
            </label>
            <label>
              Notes
              <textarea
                rows="4"
                value={sellForm.notes}
                onChange={(event) =>
                  setSellForm((current) => ({
                    ...current,
                    notes: event.target.value
                  }))
                }
              />
            </label>
            <button type="submit" className="primary-button full-width">
              Submit seller application
            </button>
            {sellSubmitted ? (
              <p className="success-text">Seller application submitted. We will contact you soon.</p>
            ) : null}
          </form>
        </div>
      </section>
    );
  }

  function renderUserLoginPage() {
    return (
      <section className="page-card auth-page">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Customer account</span>
            <h2>User login</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => goToView("home")}>
            Back to home
          </button>
        </div>

        <div className="auth-layout">
          <div className="seller-copy">
            <h3>Sign in to shop faster.</h3>
            <ul className="feature-list">
              <li>Save products and revisit them later.</li>
              <li>Track orders from checkout to delivery.</li>
              <li>Enjoy a smoother Amazon and Flipkart style flow.</li>
            </ul>
          </div>

          <form className="checkout-form" onSubmit={submitUserLogin}>
            <label>
              Email
              <input
                type="email"
                value={authForm.userEmail}
                onChange={(event) =>
                  setAuthForm((current) => ({
                    ...current,
                    userEmail: event.target.value
                  }))
                }
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={authForm.userPassword}
                onChange={(event) =>
                  setAuthForm((current) => ({
                    ...current,
                    userPassword: event.target.value
                  }))
                }
              />
            </label>
            {authError ? <p className="error-text">{authError}</p> : null}
            <button type="submit" className="primary-button full-width">
              Login as user
            </button>
          </form>
        </div>
      </section>
    );
  }

  function renderAdminLoginPage() {
    return (
      <section className="page-card auth-page">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Admin access</span>
            <h2>Admin login</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => goToView("home")}>
            Back to home
          </button>
        </div>

        <div className="auth-layout">
          <div className="seller-copy">
            <h3>Manage inventory and store activity.</h3>
            <ul className="feature-list">
              <li>Review total products and category coverage.</li>
              <li>See saved orders and live cart totals.</li>
              <li>Operate a simple dashboard from the same app.</li>
            </ul>
          </div>

          <form className="checkout-form" onSubmit={submitAdminLogin}>
            <label>
              Admin email
              <input
                type="email"
                value={authForm.adminEmail}
                onChange={(event) =>
                  setAuthForm((current) => ({
                    ...current,
                    adminEmail: event.target.value
                  }))
                }
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={authForm.adminPassword}
                onChange={(event) =>
                  setAuthForm((current) => ({
                    ...current,
                    adminPassword: event.target.value
                  }))
                }
              />
            </label>
            {authError ? <p className="error-text">{authError}</p> : null}
            <button type="submit" className="primary-button full-width">
              Login as admin
            </button>
          </form>
        </div>
      </section>
    );
  }

  function renderAdminPage() {
    if (!adminSession) {
      return renderAdminLoginPage();
    }

    return (
      <section className="page-card admin-page">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Store dashboard</span>
            <h2>Admin overview</h2>
          </div>
          <button type="button" className="ghost-button" onClick={logoutAdmin}>
            Logout admin
          </button>
        </div>

        <div className="admin-stats">
          <article className="stat-card">
            <span>Total products</span>
            <strong>{products.length}</strong>
          </article>
          <article className="stat-card">
            <span>Categories</span>
            <strong>{categories.filter((item) => item !== "All").length}</strong>
          </article>
          <article className="stat-card">
            <span>Total orders</span>
            <strong>{orders.length}</strong>
          </article>
          <article className="stat-card">
            <span>Cart value</span>
            <strong>${cartSummary.total.toFixed(2)}</strong>
          </article>
        </div>

        <div className="admin-table">
          {products.map((product) => (
            <article className="admin-row" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>
                <strong>{product.name}</strong>
                <p>{product.category}</p>
              </div>
              <span>{product.stock} in stock</span>
              <strong>${product.price}</strong>
            </article>
          ))}
        </div>
      </section>
    );
  }

  function renderDealsPage() {
    return (
      <section className="page-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Deals of the day</span>
            <h2>Best discounts in the marketplace</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => setActiveCategory("Deals")}>
            Deals category
          </button>
        </div>
        {renderCatalog(dealProducts, "Discounted products", "Save more today")}
      </section>
    );
  }

  function renderProductModal() {
    if (!selectedProduct) {
      return null;
    }

    const isSaved = savedIds.includes(selectedProduct.id);

    return (
      <div className="modal-backdrop" onClick={closeProduct}>
        <div className="product-modal" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="modal-close" onClick={closeProduct}>
            Close
          </button>
          <div className="modal-media" style={{ background: selectedProduct.gradient }}>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
          </div>
          <div className="modal-copy">
            <span className="eyebrow">{selectedProduct.badge}</span>
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <div className="detail-grid">
              <span>Category: {selectedProduct.category}</span>
              <span>Rating: {selectedProduct.rating}</span>
              <span>Reviews: {selectedProduct.reviews}</span>
              <span>Stock: {selectedProduct.stock}</span>
            </div>
            <ul className="feature-list">
              {selectedProduct.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <div className="modal-price">
              <strong>${selectedProduct.price}</strong>
              <small>${selectedProduct.originalPrice}</small>
            </div>

            <div className="modal-actions">
              <button type="button" onClick={() => addToCart(selectedProduct)}>
                Add to cart
              </button>
              <button type="button" className="ghost-button" onClick={() => toggleSaved(selectedProduct.id)}>
                {isSaved ? "Saved" : "Save item"}
              </button>
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  addToCart(selectedProduct);
                  startCheckout();
                }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderCurrentView() {
    if (activeView === "userLogin") {
      return renderUserLoginPage();
    }

    if (activeView === "adminLogin") {
      return renderAdminLoginPage();
    }

    if (activeView === "admin") {
      return renderAdminPage();
    }

    if (activeView === "saved") {
      return renderSavedPage();
    }

    if (activeView === "cart") {
      return renderCartPage();
    }

    if (activeView === "checkout") {
      return renderCheckoutPage();
    }

    if (activeView === "orders") {
      return renderOrdersPage();
    }

    if (activeView === "sell") {
      return renderSellPage();
    }

    if (activeView === "deals") {
      return renderDealsPage();
    }

    if (activeView === "shop") {
      return (
        <section className="content-grid shop-only">
          {renderCatalog(filteredProducts, "Shop all products", "Browse every category")}
          {renderSidePanel()}
        </section>
      );
    }

    return renderHome();
  }

  return (
    <div className="page-shell app-animate">
      {renderHeader()}
      <main className="homepage">{renderCurrentView()}</main>
      {renderProductModal()}
    </div>
  );
}

export default App;
