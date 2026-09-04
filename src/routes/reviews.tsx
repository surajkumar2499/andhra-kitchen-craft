import { createFileRoute } from "@tanstack/react-router";

import { Stars } from "@/components/site/Stars";
import { Reveal } from "@/components/site/Reveal";
import { REVIEWS } from "@/lib/reviews";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews | Andhra Ruchulu Pickles & Snacks" },
      {
        name: "description",
        content:
          "Read what customers across India say about Andhra Ruchulu avakaya, gongura pickle, kandi podi and homemade snacks. Rated 4.9 out of 5.",
      },
      { property: "og:title", content: "Customer Reviews | Andhra Ruchulu" },
      { property: "og:description", content: "4.9/5 from customers across India on our homemade Andhra range." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <>
      <header className="bg-offwhite">
        <div className="container-x py-14 text-center lg:py-20">
          <p className="label-caps text-terracotta">Reviews</p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">What Our Customers Say</h1>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-card px-5 py-3 ring-1 ring-border">
            <Stars rating={5} />
            <span className="text-sm font-semibold">4.9 / 5 average rating</span>
            <span className="text-sm text-muted-foreground">· 640+ reviews</span>
          </div>
        </div>
      </header>

      <div className="container-x grid gap-5 py-14 md:grid-cols-2 lg:grid-cols-3 lg:py-20">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 60}>
            <blockquote className="h-full rounded-xl border border-border bg-card p-6 shadow-card">
              <Stars rating={5} />
              <p className="mt-3 leading-relaxed">“{r.text}”</p>
              <footer className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-serif text-primary-foreground">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{r.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {r.city} · {r.product}
                  </span>
                </span>
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </>
  );
}
