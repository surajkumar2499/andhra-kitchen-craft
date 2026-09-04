import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";

import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { categories, categoryName, products, type CategorySlug } from "@/lib/products";

const searchSchema = z.object({
  category: z.enum(["pickles", "snacks", "podi", "dry-items"]).optional(),
  q: z.string().max(80).optional(),
  sort: z.enum(["featured", "price-asc", "price-desc", "rating"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop All Andhra Pickles, Snacks & Podi | Andhra Ruchulu" },
      {
        name: "description",
        content:
          "Browse every Andhra Ruchulu product — avakaya, gongura, garlic pickle, kandi podi, chekkalu, mixture and traditional dry items. Delivered across India.",
      },
      { property: "og:title", content: "Shop All Andhra Pickles, Snacks & Podi | Andhra Ruchulu" },
      {
        property: "og:description",
        content: "Homemade Andhra pickles, snacks, podi and dry items — freshly prepared in small batches.",
      },
    ],
  }),
  component: Shop,
});

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
] as const;

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [q, setQ] = useState(search.q ?? "");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCategory = search.category;
  const sort = search.sort ?? "featured";

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let out = products.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (!term) return true;
      return (
        p.name.toLowerCase().includes(term) ||
        p.short.toLowerCase().includes(term) ||
        p.ingredients.some((i) => i.toLowerCase().includes(term))
      );
    });
    if (sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [q, activeCategory, sort]);

  const setCategory = (c?: CategorySlug) =>
    navigate({ search: (prev) => ({ ...prev, category: c }) });

  return (
    <>
      <header className="border-b border-border bg-offwhite">
        <div className="container-x py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>{" "}
            / <span className="text-foreground">Shop</span>
            {activeCategory && <> / {categoryName(activeCategory)}</>}
          </nav>
          <h1 className="mt-3 font-serif text-4xl font-bold">
            {activeCategory ? categoryName(activeCategory) : "All Products"}
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Freshly prepared in small batches and shipped across India within 48 hours of packing.
          </p>
        </div>
      </header>

      <div className="container-x py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="mb-4 inline-flex w-full items-center justify-between rounded-md border border-border px-4 py-3 text-sm lg:hidden"
            >
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters &amp; sort
              </span>
              <span className="text-muted-foreground">{list.length} items</span>
            </button>

            <aside className={`${filtersOpen ? "block" : "hidden"} space-y-7 lg:block`}>
              <div>
                <h2 className="label-caps text-muted-foreground">Search</h2>
                <input
                  value={q}
                  maxLength={80}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="avakaya, podi, chekkalu…"
                  aria-label="Search products"
                  className="mt-3 w-full rounded-md border border-border bg-offwhite px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <h2 className="label-caps text-muted-foreground">Category</h2>
                <div className="mt-3 flex flex-col gap-1">
                  <FilterBtn active={!activeCategory} onClick={() => setCategory(undefined)}>
                    All products
                  </FilterBtn>
                  {categories.map((c) => (
                    <FilterBtn
                      key={c.slug}
                      active={activeCategory === c.slug}
                      onClick={() => setCategory(c.slug)}
                    >
                      {c.name}
                    </FilterBtn>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="label-caps text-muted-foreground">Sort by</h2>
                <select
                  value={sort}
                  onChange={(e) =>
                    navigate({
                      search: (prev) => ({ ...prev, sort: e.target.value as typeof sort }),
                    })
                  }
                  aria-label="Sort products"
                  className="mt-3 w-full rounded-md border border-border bg-offwhite px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </aside>
          </div>

          <div>
            <p className="mb-4 hidden text-sm text-muted-foreground lg:block">
              Showing {list.length} product{list.length === 1 ? "" : "s"}
            </p>
            {list.length === 0 ? (
              <p className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
                No products matched. Try “pickle”, “podi” or clear the filters.
              </p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((p, i) => (
                  <Reveal key={p.slug} delay={Math.min(i, 6) * 50}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
        active ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}
