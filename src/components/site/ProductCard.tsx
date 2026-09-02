import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Stars } from "./Stars";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { discountPct, formatINR, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const [weight, setWeight] = useState(product.weights[0]);
  const { add } = useCart();
  const wishlist = useWishlist();
  const price = product.price * weight.multiplier;
  const mrp = product.mrp * weight.multiplier;
  const off = discountPct(product.price, product.mrp);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={`${product.name} — homemade Andhra ${product.category}`}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.bestSeller && (
          <span className="label-caps absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-primary-foreground">
            Best Seller
          </span>
        )}
        {off > 0 && (
          <span className="absolute right-3 bottom-3 rounded-full bg-terracotta px-2.5 py-1 text-[11px] font-semibold text-terracotta-foreground">
            {off}% OFF
          </span>
        )}
      </Link>

      <button
        type="button"
        onClick={() => wishlist.toggle(product.slug)}
        aria-label={wishlist.has(product.slug) ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-card/90 text-foreground backdrop-blur transition-colors hover:text-terracotta"
      >
        <Heart
          className="h-4 w-4"
          fill={wishlist.has(product.slug) ? "currentColor" : "none"}
          strokeWidth={1.6}
        />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="text-base leading-snug font-semibold">{product.name}</h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.short}</p>

        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Stars rating={product.rating} />
          <span>
            {product.rating} · {product.reviews} reviews
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.weights.map((w) => (
            <button
              key={w.label}
              type="button"
              onClick={() => setWeight(w)}
              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                w.label === weight.label
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-primary">{formatINR(price)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatINR(mrp)}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            add({
              slug: product.slug,
              name: product.name,
              weight: weight.label,
              unitPrice: Math.round(price),
              unitMrp: Math.round(mrp),
              image: product.image,
              qty: 1,
            });
            toast.success(`${product.name} (${weight.label}) added to cart`);
          }}
          className="label-caps mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-primary-foreground transition-colors hover:bg-forest"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
