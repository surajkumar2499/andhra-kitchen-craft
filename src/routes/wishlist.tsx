import { createFileRoute, Link } from "@tanstack/react-router";

import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist | Andhra Ruchulu" },
      { name: "description", content: "The Andhra Ruchulu pickles, snacks and podi you've saved for later." },
      { property: "og:title", content: "Your Wishlist | Andhra Ruchulu" },
      { property: "og:description", content: "Saved Andhra favourites, ready when you are." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { slugs } = useWishlist();
  const saved = products.filter((p) => slugs.includes(p.slug));

  return (
    <div className="container-x py-14 lg:py-20">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">Your Wishlist</h1>
      {saved.length === 0 ? (
        <div className="mt-6">
          <p className="text-muted-foreground">Nothing saved yet. Tap the heart on any product to keep it here.</p>
          <Link to="/shop" className="label-caps mt-6 inline-flex rounded-md bg-primary px-6 py-3.5 text-primary-foreground">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
