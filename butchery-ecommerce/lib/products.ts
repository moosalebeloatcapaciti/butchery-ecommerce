export type PriceUnit = "kg" | "100g" | "250ml" | "each" | "pack";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "beef" | "pork" | "processed" | "spice" | "combo";
  categoryLabel: string;
  description: string;
  price: number; // ZAR
  compareAtPrice?: number;
  unit: PriceUnit;
  image: string;
  featured?: boolean;
};

// Pricing is based on the supplied 2026 ZAR price guide where a direct
// match exists (beef). Pork, processed and spice items are not covered by
// that guide, so reasonable mid-market ZAR prices have been estimated —
// update these freely from your Supabase "products" table or the admin
// dashboard once you're live.
export const PRODUCTS: Product[] = [
  // Beef
  {
    id: "beef-burger-patties",
    slug: "beef-burger-patties",
    name: "Beef Burger Patties",
    category: "beef",
    categoryLabel: "Beef",
    description:
      "Hand-shaped raw beef patties, seasoned and ready for the fire. Made fresh in-store daily.",
    price: 155,
    unit: "kg",
    image: "/images/beef-products/fresh Beef Burgers (raw patties).jpg",
    featured: true,
  },
  {
    id: "beef-mince-regular",
    slug: "beef-mince-regular",
    name: "Beef Mince (Regular)",
    category: "beef",
    categoryLabel: "Beef",
    description: "Everyday beef mince, ground fresh — perfect for bolognese, chakalaka mince and mogodu.",
    price: 155,
    unit: "kg",
    image: "/images/beef-products/fresh Beef Burgers (raw patties).jpg",
  },
  {
    id: "beef-mince-lean",
    slug: "beef-mince-lean",
    name: "Beef Mince (Lean)",
    category: "beef",
    categoryLabel: "Beef",
    description: "Lean cut beef mince with less fat, trimmed to order.",
    price: 195,
    unit: "kg",
    image: "/images/beef-products/fresh Beef Burgers (raw patties).jpg",
  },
  {
    id: "rump-steak",
    slug: "rump-steak",
    name: "Rump Steak",
    category: "beef",
    categoryLabel: "Beef",
    description: "Braai-ready rump, cut thick for the fire. A weekend staple.",
    price: 285,
    unit: "kg",
    image: "/images/beef-products/fresh Beef Burgers (raw patties).jpg",
    featured: true,
  },
  {
    id: "sirloin-steak",
    slug: "sirloin-steak",
    name: "Sirloin Steak",
    category: "beef",
    categoryLabel: "Beef",
    description: "Tender sirloin, trimmed and cut to your preferred thickness.",
    price: 325,
    unit: "kg",
    image: "/images/beef-products/fresh Beef Burgers (raw patties).jpg",
  },
  {
    id: "t-bone-steak",
    slug: "t-bone-steak",
    name: "T-Bone Steak",
    category: "beef",
    categoryLabel: "Beef",
    description: "The classic. Strip and fillet either side of the bone, full flavour.",
    price: 305,
    unit: "kg",
    image: "/images/beef-products/fresh Beef Burgers (raw patties).jpg",
  },
  {
    id: "oxtail",
    slug: "oxtail",
    name: "Oxtail",
    category: "beef",
    categoryLabel: "Beef",
    description: "Slow-cook oxtail, chopped and ready for a proper Sunday potjie.",
    price: 245,
    unit: "kg",
    image: "/images/beef-products/fresh Beef Burgers (raw patties).jpg",
  },

  // Pork
  {
    id: "pork-braai-chops",
    slug: "pork-braai-chops",
    name: "Pork Braai Chops",
    category: "pork",
    categoryLabel: "Pork",
    description: "Thick-cut pork chops, marbled and marinade-ready for the grid.",
    price: 120,
    unit: "kg",
    image: "/images/pork-products/fresh Pork Braai Chops.jpg",
    featured: true,
  },
  {
    id: "pork-stew-meat",
    slug: "pork-stew-meat",
    name: "Pork Stew Meat (Cubed)",
    category: "pork",
    categoryLabel: "Pork",
    description: "Cubed pork stew meat, cut fresh for a hearty pot.",
    price: 100,
    unit: "kg",
    image: "/images/pork-products/fresh Pork Stew meat (cubed).jpg",
  },
  {
    id: "pork-packs-assorted",
    slug: "pork-packs-assorted",
    name: "Pork Packs (Assorted Cuts)",
    category: "pork",
    categoryLabel: "Pork",
    description: "A mixed pack of assorted pork cuts — great value for the freezer.",
    price: 115,
    unit: "kg",
    image: "/images/pork-products/fresh Pork Packs (assorted cuts).jpg",
  },
  {
    id: "pork-trotters",
    slug: "pork-trotters",
    name: "Pork Trotters",
    category: "pork",
    categoryLabel: "Pork",
    description: "Cleaned pork trotters, ready for a slow-cooked classic.",
    price: 55,
    unit: "kg",
    image: "/images/pork-products/fresh Pork Trotters.jpg",
  },
  {
    id: "pork-back-bones",
    slug: "pork-back-bones",
    name: "Pork Back Bones",
    category: "pork",
    categoryLabel: "Pork",
    description: "Meaty pork back bones for soups, stews and slow braises.",
    price: 65,
    unit: "kg",
    image: "/images/pork-products/fresh Pork Back Bones.jpg",
  },
  {
    id: "pork-smoked-bones",
    slug: "pork-smoked-bones",
    name: "Pork Smoked Bones",
    category: "pork",
    categoryLabel: "Pork",
    description: "In-house smoked pork bones — deep smoky flavour for beans and greens.",
    price: 70,
    unit: "kg",
    image: "/images/pork-products/fresh Pork Smoked Bones.jpg",
  },

  // Processed / other
  {
    id: "biltong",
    slug: "biltong",
    name: "Traditional Biltong",
    category: "processed",
    categoryLabel: "Biltong & Droëwors",
    description: "Air-dried, spice-cured biltong made the traditional way. Sold by the 100g.",
    price: 22,
    unit: "100g",
    image: "/images/other-processed-products/biltong.png",
    featured: true,
  },
  {
    id: "boerewors-coiled",
    slug: "boerewors-coiled",
    name: "Fresh Boerewors (Coiled)",
    category: "processed",
    categoryLabel: "Wors & Sausage",
    description: "Coiled boerewors made fresh in-house with our own spice blend.",
    price: 105,
    unit: "kg",
    image: "/images/other-processed-products/fresh Boerewors (coiled).jpg",
    featured: true,
  },
  {
    id: "chakalaka-wors",
    slug: "chakalaka-wors",
    name: "Chakalaka Wors (Coiled)",
    category: "processed",
    categoryLabel: "Wors & Sausage",
    description: "Our boerewors with a fiery chakalaka twist, coiled fresh.",
    price: 115,
    unit: "kg",
    image: "/images/other-processed-products/fresh Chakalaka Wors (coiled).jpg",
  },
  {
    id: "chakalaka-burgers",
    slug: "chakalaka-burgers",
    name: "Chakalaka Burgers",
    category: "processed",
    categoryLabel: "Burgers",
    description: "Raw beef patties packed with chakalaka spice for a bold, proud flavour.",
    price: 165,
    unit: "kg",
    image: "/images/other-processed-products/fresh Chakalaka Burgers (raw).jpg",
  },
  {
    id: "chakalaka-mince",
    slug: "chakalaka-mince",
    name: "Chakalaka Mince",
    category: "processed",
    categoryLabel: "Mince",
    description: "Pre-spiced chakalaka mince, ready to hit the pan.",
    price: 160,
    unit: "kg",
    image: "/images/other-processed-products/fresh Chakalaka Mince.jpg",
  },
  {
    id: "french-polony",
    slug: "french-polony",
    name: "French Polony",
    category: "processed",
    categoryLabel: "Cold Meats",
    description: "Sliced or whole French polony, a lunchbox and braai side favourite.",
    price: 70,
    unit: "kg",
    image: "/images/other-processed-products/fresh French Polony (sliced and whole).jpg",
  },
  {
    id: "penny-polony",
    slug: "penny-polony",
    name: "Penny Polony",
    category: "processed",
    categoryLabel: "Cold Meats",
    description: "The classic penny polony, whole or sliced to order.",
    price: 55,
    unit: "kg",
    image: "/images/other-processed-products/fresh Penny Polony (whole and sliced).jpg",
  },
  {
    id: "red-viennas",
    slug: "red-viennas",
    name: "Red Viennas",
    category: "processed",
    categoryLabel: "Cold Meats",
    description: "Classic red viennas — braai, boil or pan-fry.",
    price: 75,
    unit: "kg",
    image: "/images/other-processed-products/fresh Red Viennas.jpg",
  },
  {
    id: "sandwich-ham",
    slug: "sandwich-ham",
    name: "Sandwich Ham (Sliced)",
    category: "processed",
    categoryLabel: "Cold Meats",
    description: "Sliced sandwich ham, cut fresh at the counter.",
    price: 150,
    unit: "kg",
    image: "/images/other-processed-products/fresh Sandwich Ham (sliced).jpg",
  },

  // Spices
  {
    id: "house-braai-spice",
    slug: "house-braai-spice",
    name: "House Braai Spice Blend",
    category: "spice",
    categoryLabel: "Spices & Marinades",
    description: "Our signature steak & chops spice blend — the same one we use on our own braai.",
    price: 32,
    unit: "100g",
    image: "/images/spice-products/demo.jpg",
    featured: true,
  },
  {
    id: "five-spice-pack",
    slug: "five-spice-pack",
    name: "Signature 5-Spice Pack",
    category: "spice",
    categoryLabel: "Spices & Marinades",
    description: "All five of our house spice blends in one pack — steak, chops, wors, chakalaka and peri-peri.",
    price: 150,
    unit: "pack",
    image: "/images/spice-products/5-spices-in-a-single-shoot.jpg",
  },
  {
    id: "peri-peri-marinade",
    slug: "peri-peri-marinade",
    name: "Peri-Peri Marinade",
    category: "spice",
    categoryLabel: "Spices & Marinades",
    description: "Bottled peri-peri marinade, ready to pour and braai.",
    price: 75,
    unit: "250ml",
    image: "/images/spice-products/5-spices-in-a-single-shoot.jpg",
  },
  {
    id: "bbq-marinade",
    slug: "bbq-marinade",
    name: "BBQ Marinade",
    category: "spice",
    categoryLabel: "Spices & Marinades",
    description: "Smoky-sweet BBQ marinade, bottled and braai-ready.",
    price: 75,
    unit: "250ml",
    image: "/images/spice-products/5-spices-in-a-single-shoot.jpg",
  },

  // Combos (from the price-suggestions "Gen Z appeal" tip)
  {
    id: "braai-box",
    slug: "braai-box",
    name: "The Braai Box",
    category: "combo",
    categoryLabel: "Combo Deals",
    description: "Rump steak, boerewors, chicken wings and our house spice — everything for a proper braai in one box.",
    price: 650,
    unit: "pack",
    image: "/images/business-past-menus/past-specials-promos1.jpg",
    featured: true,
  },
  {
    id: "family-feast",
    slug: "family-feast",
    name: "Family Feast Pack",
    category: "combo",
    categoryLabel: "Combo Deals",
    description: "Whole chicken, beef mince and pork braai chops — a full family meal sorted.",
    price: 750,
    unit: "pack",
    image: "/images/business-past-menus/past-specials-promos2.jpg",
  },
];

export const CATEGORIES: { key: Product["category"]; label: string; icon: string }[] = [
  { key: "beef", label: "Beef", icon: "/images/web-icons/beef-icon.jpg" },
  { key: "pork", label: "Pork", icon: "/images/web-icons/pork-icon.jpg" },
  { key: "processed", label: "Wors, Biltong & Cold Meats", icon: "/images/web-icons/beef-icon.jpg" },
  { key: "spice", label: "Spices & Marinades", icon: "/images/web-icons/pork-icon.jpg" },
  { key: "combo", label: "Combo Deals", icon: "/images/web-icons/beef-icon.jpg" },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  if (category === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}
