import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import type { CategorySlug } from "@/lib/products";

export function CategoryCard({
  slug,
  name,
  count,
  image,
  blurb,
}: {
  slug: CategorySlug;
  name: string;
  count: string;
  image: string;
  blurb: string;
}) {
  return (
    <Link
      to="/shop"
      search={{ category: slug }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={`${name} — authentic Andhra ${name.toLowerCase()}`}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-bold">{name}</h3>
        <p className="mt-1 text-xs tracking-widest text-terracotta uppercase">{count}</p>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{blurb}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
          Explore {name}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
