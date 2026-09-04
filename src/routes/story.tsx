import { createFileRoute, Link } from "@tanstack/react-router";

import storyImg from "@/assets/story-kitchen.jpg";
import heroImg from "@/assets/hero-ambassador.jpg";
import picklesImg from "@/assets/cat-pickles.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story | Andhra Ruchulu — From Our Kitchen to Your Table" },
      {
        name: "description",
        content:
          "How Andhra Ruchulu grew from pickles made for family into a homemade Andhra food brand shipping traditional recipes across India.",
      },
      { property: "og:title", content: "Our Story | Andhra Ruchulu" },
      {
        property: "og:description",
        content: "From our Andhra kitchen to your home — traditional recipes, small batches, made with care.",
      },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <>
      <header className="bg-offwhite">
        <div className="container-x py-14 text-center lg:py-20">
          <p className="label-caps text-terracotta">Our story</p>
          <h1 className="mx-auto mt-3 max-w-3xl font-serif text-4xl font-bold sm:text-5xl">
            From Our Kitchen to Your Table
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Andhra Ruchulu started with a simple love for the bold, unforgettable flavours of Andhra
            cuisine.
          </p>
        </div>
      </header>

      <div className="container-x py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={storyImg}
            alt="Mixing avakaya pickle by hand in a traditional clay pot"
            loading="lazy"
            width={1280}
            height={960}
            className="w-full rounded-2xl object-cover shadow-card"
          />
          <div className="space-y-4 text-muted-foreground">
            <h2 className="font-serif text-3xl font-bold text-foreground">It began with one mango season</h2>
            <p>
              Every summer, our kitchen filled with crates of raw mango, sacks of Guntur chilli and
              the smell of mustard being split. What started as jars packed for family and friends
              slowly turned into requests from their friends, then from strangers.
            </p>
            <p>
              We never scaled it into a factory. We scaled the kitchen. Every batch is still mixed by
              hand, rested in clay and oil, and tasted before it is sealed.
            </p>
            <p>
              Today Andhra Ruchulu ships across India — but the recipe card has not changed since the
              first jar.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Sourced in season",
              d: "Mango from the coastal belt, gongura from local farms and chilli from Guntur — bought only when they are at their best.",
            },
            {
              n: "02",
              t: "Mixed by hand",
              d: "No machines, no shortcuts. Spices are roasted, ground and folded in by hand, then rested so flavours settle.",
            },
            {
              n: "03",
              t: "Packed the same week",
              d: "Small batches mean nothing sits in storage. What you open tastes like it was made days ago, because it was.",
            },
          ].map((s) => (
            <article key={s.n} className="rounded-xl border border-border bg-card p-7 shadow-card">
              <span className="font-serif text-3xl font-bold text-mustard">{s.n}</span>
              <h3 className="mt-3 font-serif text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-3xl font-bold">Meet the face of our kitchen</h2>
            <p className="mt-4 text-muted-foreground">
              Our brand ambassador is a fictional character created to represent the Andhra Ruchulu
              kitchen — the sister, mother and homemaker whose recipes these are. She stands for the
              care that goes into every jar rather than any one person.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <img src={picklesImg} alt="Avakaya pickle close-up" loading="lazy" width={1024} height={768} className="rounded-xl object-cover" />
              <img src={heroImg} alt="Andhra Ruchulu brand ambassador" loading="lazy" width={1280} height={1280} className="rounded-xl object-cover" />
            </div>
            <Link
              to="/shop"
              className="label-caps mt-8 inline-flex rounded-md bg-primary px-6 py-3.5 text-primary-foreground"
            >
              Taste the recipes
            </Link>
          </div>
          <blockquote className="order-1 rounded-2xl bg-forest p-8 text-cream lg:order-2 lg:p-12">
            <p className="font-serif text-2xl leading-snug sm:text-3xl">
              “Great food doesn't need complicated recipes. It needs good ingredients, traditional
              methods and plenty of love.”
            </p>
            <footer className="mt-6 text-sm text-cream/70">— The Andhra Ruchulu kitchen</footer>
          </blockquote>
        </div>
      </div>
    </>
  );
}
