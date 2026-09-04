import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ProductCard } from "@/components/site/ProductCard";
import { Stars } from "@/components/site/Stars";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import {
  categoryName,
  discountPct,
  findProduct,
  formatINR,
  products,
  type Product,
} from "@/lib/products";
import { REVIEWS } from "@/lib/reviews";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found | Andhra Ruchulu" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    const title = `${p.name} | Andhra Ruchulu`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: p.short },
        { property: "og:type", content: "product" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            brand: { "@type": "Brand", name: "Andhra Ruchulu" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: p.rating,
              reviewCount: p.reviews,
            },
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-serif text-3xl font-bold">We couldn't find that product</h1>
      <Link to="/shop" className="label-caps mt-6 inline-flex rounded-md bg-primary px-5 py-3 text-primary-foreground">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

const TABS = ["Description", "Ingredients", "Nutrition", "Shipping", "Reviews"] as const;

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [weight, setWeight] = useState(product.weights[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Description");
  const [activeImage, setActiveImage] = useState(0);
  const cart = useCart();
  const wishlist = useWishlist();

  const price = Math.round(product.price * weight.multiplier);
  const mrp = Math.round(product.mrp * weight.multiplier);
  const off = discountPct(product.price, product.mrp);
  const gallery = [product.image, product.image, product.image];
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  const addToCart = () => {
    cart.add({
      slug: product.slug,
      name: product.name,
      weight: weight.label,
      unitPrice: price,
      unitMrp: mrp,
      image: product.image,
      qty,
    });
    toast.success(`${product.name} (${weight.label}) added to cart`);
  };

  return (
    <>
      <div className="container-x pt-8 pb-24 lg:pb-16">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/shop" search={{ category: product.category }} className="hover:text-primary">
            {categoryName(product.category)}
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={gallery[activeImage]}
                alt={`${product.name} — ${product.short}`}
                width={1024}
                height={1024}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="mt-3 flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`overflow-hidden rounded-lg border-2 ${
                    activeImage === i ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={g} alt="" loading="lazy" width={160} height={160} className="h-16 w-16 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="label-caps text-terracotta">{categoryName(product.category)}</p>
            <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Stars rating={product.rating} />
              <span>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-primary">{formatINR(price)}</span>
              <span className="text-muted-foreground line-through">{formatINR(mrp)}</span>
              {off > 0 && (
                <span className="rounded-full bg-terracotta px-2.5 py-1 text-[11px] font-semibold text-terracotta-foreground">
                  {off}% OFF
                </span>
              )}
              <span className="text-xs text-muted-foreground">Inclusive of all taxes</span>
            </div>

            <div className="mt-6">
              <p className="label-caps text-muted-foreground">Select weight</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.weights.map((w) => (
                  <button
                    key={w.label}
                    onClick={() => setWeight(w)}
                    className={`rounded-md border px-4 py-2.5 text-sm transition-colors ${
                      w.label === weight.label
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

            <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
              {[
                "Homemade preparation",
                "Authentic Andhra recipe",
                "Carefully packed",
                "Pan India delivery",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-primary">✓</span> {f}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-md border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="px-3 py-3">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-9 text-center text-sm">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity" className="px-3 py-3">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={addToCart}
                className="label-caps flex-1 rounded-md bg-primary px-6 py-3.5 text-primary-foreground transition-colors hover:bg-forest"
              >
                Add to Cart
              </button>
              <button
                onClick={() => wishlist.toggle(product.slug)}
                aria-label="Toggle wishlist"
                className="grid h-12 w-12 place-items-center rounded-md border border-border hover:border-terracotta"
              >
                <Heart className="h-5 w-5" fill={wishlist.has(product.slug) ? "currentColor" : "none"} strokeWidth={1.6} />
              </button>
            </div>
            <Link
              to="/checkout"
              onClick={addToCart}
              className="label-caps mt-3 block rounded-md border border-primary px-6 py-3.5 text-center text-primary"
            >
              Buy Now
            </Link>

            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4 text-primary" /> Free delivery on orders above ₹999 · Ships in 48 hours
            </p>
          </div>
        </div>

        <section className="mt-14">
          <div className="flex flex-wrap gap-1 border-b border-border">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  tab === t ? "border-terracotta text-terracotta" : "border-transparent text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="py-6 text-sm leading-relaxed text-muted-foreground">
            {tab === "Description" && <p className="max-w-3xl">{product.description}</p>}
            {tab === "Ingredients" && (
              <div className="max-w-3xl">
                <ul className="flex flex-wrap gap-2">
                  {product.ingredients.map((i) => (
                    <li key={i} className="rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground">
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs">Allergen note: {product.allergens}</p>
              </div>
            )}
            {tab === "Nutrition" && (
              <table className="w-full max-w-md text-left">
                <tbody>
                  {[
                    ["Serving size", "15 g"],
                    ["Energy", "62 kcal"],
                    ["Fat", "5.1 g"],
                    ["Carbohydrate", "3.4 g"],
                    ["Protein", "0.7 g"],
                    ["Sodium", "480 mg"],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-border">
                      <th scope="row" className="py-2.5 font-normal">
                        {k}
                      </th>
                      <td className="py-2.5 text-right text-foreground">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "Shipping" && (
              <div className="max-w-3xl space-y-2">
                <p>Orders are packed within 48 hours and shipped pan India via tracked courier.</p>
                <p>Delivery typically takes 3–6 working days. Free delivery on orders above ₹999.</p>
                <p>Pickle jars are sealed and bubble-wrapped; snacks ship in nitrogen-flushed pouches.</p>
              </div>
            )}
            {tab === "Reviews" && (
              <div className="grid max-w-3xl gap-4">
                {REVIEWS.slice(0, 4).map((r) => (
                  <blockquote key={r.name} className="rounded-xl border border-border bg-card p-5">
                    <Stars rating={5} />
                    <p className="mt-2 text-foreground">“{r.text}”</p>
                    <footer className="mt-2 text-xs">
                      — {r.name}, {r.city}
                    </footer>
                  </blockquote>
                ))}
              </div>
            )}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold">You may also like</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p: Product) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky add to cart */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-offwhite px-4 py-3 lg:hidden">
        <span className="min-w-0">
          <span className="block truncate text-xs text-muted-foreground">{weight.label}</span>
          <span className="block font-semibold text-primary">{formatINR(price)}</span>
        </span>
        <button
          onClick={addToCart}
          className="label-caps flex-1 rounded-md bg-primary px-4 py-3.5 text-primary-foreground"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
