const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const products = [
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

app.get("/api/store", (_request, response) => {
  response.json({
    categories: [...new Set(products.map((product) => product.category))],
    products
  });
});

app.get("/", (_request, response) => {
  response.send("LumaCart API is running.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
