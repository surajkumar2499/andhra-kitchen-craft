import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { categories, categoryName, formatINR, products } from "@/lib/products";

const SUGGESTIONS = ["avakaya", "gongura", "pickle", "snacks", "podi"];

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) return;
    setQ("");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const term = q.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!term) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.short.toLowerCase().includes(term) ||
          categoryName(p.category).toLowerCase().includes(term) ||
          p.ingredients.some((i) => i.toLowerCase().includes(term)),
      )
      .slice(0, 6);
  }, [term]);

  const catMatches = useMemo(
    () => (term ? categories.filter((c) => c.name.toLowerCase().includes(term)) : []),
    [term],
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60">
      <button aria-label="Close search" onClick={onClose} className="absolute inset-0 bg-cocoa/45" />
      <div className="relative mx-auto mt-20 w-[min(42rem,92vw)] overflow-hidden rounded-xl border border-border bg-background shadow-lift">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search avakaya, gongura, podi…"
            className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none"
          />
          <button onClick={onClose} aria-label="Close search" className="p-1 text-muted-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {!term && (
            <div className="p-2">
              <p className="label-caps text-muted-foreground">Popular searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQ(s)}
                    className="rounded-full border border-border px-3 py-1.5 text-sm capitalize hover:border-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {term && matches.length === 0 && catMatches.length === 0 && (
            <p className="p-4 text-sm text-muted-foreground">
              Nothing matched “{q}”. Try “pickle”, “podi” or “chekkalu”.
            </p>
          )}

          {catMatches.length > 0 && (
            <div className="mb-2">
              <p className="label-caps px-2 py-1 text-muted-foreground">Categories</p>
              {catMatches.map((c) => (
                <Link
                  key={c.slug}
                  to="/shop"
                  search={{ category: c.slug }}
                  onClick={onClose}
                  className="block rounded-md px-2 py-2 text-sm hover:bg-secondary"
                >
                  {c.name} · {c.count}
                </Link>
              ))}
            </div>
          )}

          {matches.map((p) => (
            <Link
              key={p.slug}
              to="/product/$slug"
              params={{ slug: p.slug }}
              onClick={onClose}
              className="flex items-center gap-3 rounded-md p-2 hover:bg-secondary"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={96}
                height={96}
                className="h-12 w-12 rounded object-cover"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{p.name}</span>
                <span className="block text-xs text-muted-foreground">{categoryName(p.category)}</span>
              </span>
              <span className="text-sm font-semibold text-primary">{formatINR(p.price)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
