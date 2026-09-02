import avakayaImg from "@/assets/product-avakaya.jpg";
import picklesImg from "@/assets/cat-pickles.jpg";
import snacksImg from "@/assets/cat-snacks.jpg";
import podiImg from "@/assets/cat-podi.jpg";
import dryImg from "@/assets/cat-dry.jpg";

export type CategorySlug = "pickles" | "snacks" | "podi" | "dry-items";

export type WeightOption = { label: string; multiplier: number };

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  short: string;
  description: string;
  ingredients: string[];
  allergens: string;
  weights: WeightOption[];
  bestSeller?: boolean;
};

export const categories: {
  slug: CategorySlug;
  name: string;
  count: string;
  image: string;
  blurb: string;
}[] = [
  {
    slug: "pickles",
    name: "Pickles",
    count: "15+ Varieties",
    image: picklesImg,
    blurb: "Avakaya, gongura, garlic and more — slow-mixed the traditional way.",
  },
  {
    slug: "snacks",
    name: "Snacks",
    count: "10+ Varieties",
    image: snacksImg,
    blurb: "Crisp chekkalu, murukku and mixture, fried fresh in small batches.",
  },
  {
    slug: "podi",
    name: "Podi & Powders",
    count: "8+ Varieties",
    image: podiImg,
    blurb: "Stone-ground podis that turn plain rice into a full meal.",
  },
  {
    slug: "dry-items",
    name: "Dry Items",
    count: "12+ Varieties",
    image: dryImg,
    blurb: "Sun-dried vadiyalu, papad and traditional Andhra dry staples.",
  },
];

export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;

const pickleWeights: WeightOption[] = [
  { label: "250g", multiplier: 1 },
  { label: "500g", multiplier: 1.85 },
  { label: "1kg", multiplier: 3.5 },
];

const snackWeights: WeightOption[] = [
  { label: "200g", multiplier: 1 },
  { label: "400g", multiplier: 1.9 },
];

const podiWeights: WeightOption[] = [
  { label: "150g", multiplier: 1 },
  { label: "300g", multiplier: 1.9 },
];

const p = (
  slug: string,
  name: string,
  category: CategorySlug,
  price: number,
  mrp: number,
  rating: number,
  reviews: number,
  image: string,
  short: string,
  description: string,
  ingredients: string[],
  weights: WeightOption[],
  bestSeller = false,
): Product => ({
  slug,
  name,
  category,
  price,
  mrp,
  rating,
  reviews,
  image,
  short,
  description,
  ingredients,
  allergens: "Prepared in a kitchen that also handles mustard, sesame, peanuts and gluten.",
  weights,
  bestSeller,
});

export const products: Product[] = [
  p(
    "andhra-avakaya-pickle",
    "Andhra Avakaya Pickle",
    "pickles",
    249,
    299,
    4.9,
    128,
    avakayaImg,
    "The classic raw mango pickle of Andhra summers.",
    "A bold and authentic Andhra mango pickle prepared with firm raw mango, sun-dried red chilli, split mustard and cold-pressed sesame oil. Mixed by hand and rested so the mango soaks up every bit of spice.",
    ["Raw mango", "Red chilli powder", "Mustard split", "Sesame oil", "Salt", "Turmeric", "Fenugreek"],
    pickleWeights,
    true,
  ),
  p(
    "gongura-pickle",
    "Gongura Pickle",
    "pickles",
    249,
    289,
    4.8,
    96,
    picklesImg,
    "Tangy sorrel leaves, slow-cooked with garlic and chilli.",
    "Fresh gongura leaves are cleaned, wilted and ground with red chilli, garlic and tempered spices. Sharp, tangy and unmistakably Andhra.",
    ["Gongura leaves", "Red chilli", "Garlic", "Sesame oil", "Salt", "Mustard", "Cumin"],
    pickleWeights,
    true,
  ),
  p(
    "garlic-pickle",
    "Garlic Pickle",
    "pickles",
    269,
    319,
    4.8,
    74,
    picklesImg,
    "Whole garlic cloves in a deep, spicy masala.",
    "Hand-peeled garlic cloves rested in a thick chilli and tamarind masala until soft. Excellent with curd rice, dosa and rotis.",
    ["Garlic", "Tamarind", "Red chilli", "Sesame oil", "Jaggery", "Salt", "Mustard"],
    pickleWeights,
    true,
  ),
  p(
    "lemon-pickle",
    "Lemon Pickle",
    "pickles",
    229,
    269,
    4.7,
    61,
    picklesImg,
    "Sun-cured lemon, salt and chilli. Nothing else.",
    "Country lemons are cured in salt until the skin softens, then mixed with chilli powder and a light tempering. Ages beautifully.",
    ["Lemon", "Salt", "Red chilli powder", "Turmeric", "Mustard", "Sesame oil"],
    pickleWeights,
  ),
  p(
    "tomato-pickle",
    "Tomato Pickle",
    "pickles",
    229,
    259,
    4.7,
    58,
    picklesImg,
    "Slow-cooked tomatoes with tamarind and garlic.",
    "Ripe tomatoes cooked down slowly with tamarind, garlic and chilli into a thick, glossy pickle. A everyday favourite with idli and dosa.",
    ["Tomato", "Tamarind", "Garlic", "Red chilli", "Sesame oil", "Salt", "Fenugreek"],
    pickleWeights,
  ),
  p(
    "ginger-pickle",
    "Ginger Pickle",
    "pickles",
    249,
    289,
    4.6,
    43,
    picklesImg,
    "Sharp, warming allam pachadi style pickle.",
    "Fresh ginger ground with tamarind and jaggery for the classic sweet-sour-spicy balance of Andhra allam pachadi.",
    ["Ginger", "Tamarind", "Jaggery", "Red chilli", "Salt", "Sesame oil"],
    pickleWeights,
  ),
  p(
    "magaya-pickle",
    "Magaya Pickle",
    "pickles",
    279,
    329,
    4.8,
    39,
    picklesImg,
    "Dried mango pieces in a rich, dark masala.",
    "Sun-dried mango pieces soaked in a spiced oil masala until they turn soft and glossy. A rarer Andhra speciality, made only in season.",
    ["Sun-dried mango", "Red chilli", "Mustard", "Sesame oil", "Jaggery", "Salt"],
    pickleWeights,
  ),
  p(
    "chekkalu",
    "Chekkalu",
    "snacks",
    199,
    229,
    4.9,
    112,
    snacksImg,
    "Crisp rice crackers with chana dal and chilli.",
    "Thin rice flour discs pressed by hand with chana dal, curry leaves and cumin, then fried crisp in fresh oil. Fried the day it ships.",
    ["Rice flour", "Chana dal", "Curry leaves", "Cumin", "Green chilli", "Salt", "Sunflower oil"],
    snackWeights,
    true,
  ),
  p(
    "andhra-mixture",
    "Andhra Mixture",
    "snacks",
    199,
    239,
    4.8,
    88,
    snacksImg,
    "Boondi, sev, peanuts and curry leaves.",
    "A generous mix of crunchy sev, boondi, fried peanuts, cashew bits and curry leaves with a proper Andhra chilli kick.",
    ["Besan", "Rice flour", "Peanuts", "Curry leaves", "Red chilli", "Salt", "Sunflower oil"],
    snackWeights,
    true,
  ),
  p(
    "karapusa",
    "Karapusa",
    "snacks",
    189,
    219,
    4.7,
    54,
    snacksImg,
    "Fine spicy sev, the Andhra tea-time staple.",
    "Besan and rice flour dough spiced with chilli and ajwain, pressed fine and fried till golden.",
    ["Besan", "Rice flour", "Red chilli", "Ajwain", "Salt", "Sunflower oil"],
    snackWeights,
  ),
  p(
    "murukku",
    "Murukku",
    "snacks",
    199,
    229,
    4.7,
    47,
    snacksImg,
    "Hand-twisted spirals, crisp all the way through.",
    "Classic rice-and-urad murukku shaped by hand with sesame and cumin. Light, shatteringly crisp and never oily.",
    ["Rice flour", "Urad dal flour", "Sesame seeds", "Cumin", "Salt", "Sunflower oil"],
    snackWeights,
  ),
  p(
    "banana-chips",
    "Banana Chips",
    "snacks",
    179,
    199,
    4.6,
    36,
    snacksImg,
    "Thin raw banana wafers with chilli salt.",
    "Raw bananas sliced thin and fried in coconut oil, then finished with chilli salt.",
    ["Raw banana", "Coconut oil", "Red chilli powder", "Salt"],
    snackWeights,
  ),
  p(
    "kandi-podi",
    "Kandi Podi",
    "podi",
    199,
    229,
    4.9,
    103,
    podiImg,
    "Toor dal podi — rice and ghee's best friend.",
    "Toor and chana dal roasted slowly with red chilli, garlic and cumin, then stone-ground coarse. Mix with hot rice and a spoon of ghee.",
    ["Toor dal", "Chana dal", "Red chilli", "Garlic", "Cumin", "Salt"],
    podiWeights,
    true,
  ),
  p(
    "idli-podi",
    "Idli Podi",
    "podi",
    179,
    209,
    4.8,
    79,
    podiImg,
    "Classic milagai podi for idli and dosa.",
    "Urad and chana dal roasted with red chilli and a hint of asafoetida for the classic gunpowder podi.",
    ["Urad dal", "Chana dal", "Red chilli", "Sesame seeds", "Asafoetida", "Salt"],
    podiWeights,
  ),
  p(
    "karivepaku-podi",
    "Karivepaku Podi",
    "podi",
    199,
    229,
    4.8,
    64,
    podiImg,
    "Curry leaf podi, deep green and fragrant.",
    "Fresh curry leaves dried and ground with dals and chilli. Earthy, aromatic and wonderful with ghee rice.",
    ["Curry leaves", "Urad dal", "Chana dal", "Red chilli", "Tamarind", "Salt"],
    podiWeights,
  ),
  p(
    "peanut-podi",
    "Peanut Podi",
    "podi",
    189,
    219,
    4.7,
    41,
    podiImg,
    "Roasted peanut podi, mild and nutty.",
    "Skinned roasted peanuts ground with garlic, cumin and chilli. The gentlest podi in our range.",
    ["Peanuts", "Garlic", "Red chilli", "Cumin", "Salt"],
    podiWeights,
  ),
  p(
    "garlic-podi",
    "Garlic Podi",
    "podi",
    199,
    229,
    4.7,
    38,
    podiImg,
    "Bold garlic podi with a strong chilli finish.",
    "Dry-roasted garlic pounded with red chilli and dals. Strong, pungent and very Andhra.",
    ["Garlic", "Red chilli", "Urad dal", "Cumin", "Salt"],
    podiWeights,
  ),
  p(
    "minapa-vadiyalu",
    "Minapa Vadiyalu",
    "dry-items",
    189,
    219,
    4.7,
    32,
    dryImg,
    "Sun-dried urad dal fritters, ready to fry.",
    "Ground urad batter spooned out and sun-dried over three days. Fry them fresh at home for a crisp side.",
    ["Urad dal", "Salt", "Cumin", "Green chilli"],
    snackWeights,
  ),
  p(
    "sabudana-vadiyalu",
    "Sabudana Vadiyalu",
    "dry-items",
    179,
    209,
    4.6,
    27,
    dryImg,
    "Sago crisps that puff up in seconds.",
    "Sago cooked, seasoned and sun-dried into thin discs that puff instantly when fried.",
    ["Sago", "Salt", "Green chilli", "Cumin"],
    snackWeights,
  ),
  p(
    "appadalu-papad",
    "Appadalu (Papad)",
    "dry-items",
    169,
    199,
    4.6,
    24,
    dryImg,
    "Hand-rolled urad papad with black pepper.",
    "Thin hand-rolled papad with cracked black pepper, dried in the Andhra sun.",
    ["Urad dal flour", "Black pepper", "Salt", "Asafoetida"],
    snackWeights,
  ),
  p(
    "guntur-chilli-powder",
    "Guntur Chilli Powder",
    "dry-items",
    229,
    259,
    4.8,
    46,
    dryImg,
    "Stone-ground Guntur chilli, fiery and fragrant.",
    "Guntur Sannam chillies, sun-dried and stone-ground fresh. Deep red colour and a clean, sharp heat.",
    ["Guntur red chilli", "Salt"],
    podiWeights,
  ),
];

export const findProduct = (slug: string) => products.find((x) => x.slug === slug);

export const bestSellers = products.filter((x) => x.bestSeller);

export const formatINR = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export const discountPct = (price: number, mrp: number) =>
  Math.round(((mrp - price) / mrp) * 100);

export const comboBox = {
  slug: "andhra-starter-box",
  name: "The Andhra Starter Box",
  price: 799,
  mrp: 999,
  items: ["Avakaya Pickle", "Gongura Pickle", "Garlic Pickle", "Kandi Podi", "Chekkalu"],
};
