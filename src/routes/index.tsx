import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Flame,
  HeartHandshake,
  Instagram,
  Leaf,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import heroImg from "@/assets/hero-ambassador.jpg";
import storyImg from "@/assets/story-kitchen.jpg";
import comboImg from "@/assets/combo-box.jpg";
import picklesImg from "@/assets/cat-pickles.jpg";
import snacksImg from "@/assets/cat-snacks.jpg";
import podiImg from "@/assets/cat-podi.jpg";
import dryImg from "@/assets/cat-dry.jpg";
import avakayaImg from "@/assets/product-avakaya.jpg";

import { CategoryCard } from "@/components/site/CategoryCard";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { Stars } from "@/components/site/Stars";
import { bestSellers, categories, comboBox, formatINR } from "@/lib/products";
import { REVIEWS } from "@/lib/reviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Andhra Ruchulu | Authentic Homemade Andhra Pickles & Snacks" },
      {
        name: "description",
        content:
          "Shop authentic homemade Andhra pickles, snacks, podi and traditional favourites. Made with traditional recipes and delivered across India.",
      },
      { property: "og:title", content: "Andhra Ruchulu | Authentic Homemade Andhra Pickles & Snacks" },
      {
        property: "og:description",
        content:
          "Traditional Andhra recipes passed down through generations — avakaya, gongura, podi and crisp homemade snacks, delivered across India.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategorySection />
      <BestSellers />
      <ComboSection />
      <WhyUs />
      <StorySection />
      <AndhraSection />
      <ReviewsStrip />
      <SocialGrid />
      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-8 lg:py-20">
        <div className="fade-up">
          <span className="label-caps inline-flex items-center gap-2 rounded-full bg-offwhite px-3 py-1.5 text-terracotta ring-1 ring-border">
            Homemade with love ❤️
          </span>
          <h1 className="mt-5 font-serif text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
            Authentic <span className="text-terracotta">Andhra</span>
            <br />
            Pickles &amp; Snacks
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Traditional Andhra recipes passed down through generations, made with quality
            ingredients and the bold, authentic flavours of a homemade kitchen.
          </p>

          <ul className="mt-6 grid max-w-lg grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {[
              "100% Homemade",
              "Authentic Andhra Recipes",
              "No Unnecessary Preservatives",
              "Freshly Prepared",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="label-caps rounded-md bg-primary px-7 py-4 text-primary-foreground shadow-lift transition-colors hover:bg-forest"
            >
              Shop Now
            </Link>
            <Link
              to="/story"
              className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm font-medium"
            >
              Our Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-lift">
            <img
              src={heroImg}
              alt="Andhra Ruchulu brand ambassador holding a jar of homemade avakaya pickle"
              width={1280}
              height={1280}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 rounded-full bg-offwhite px-4 py-2 text-center shadow-lift ring-1 ring-border sm:left-6">
            <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Made in</p>
            <p className="font-serif text-sm font-bold text-terracotta">Andhra Pradesh 🇮🇳</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const BENEFITS = [
  { icon: Flame, title: "Authentic Andhra Taste", sub: "Traditional recipes & bold flavours" },
  { icon: Leaf, title: "Premium Ingredients", sub: "Carefully selected ingredients" },
  { icon: ShieldCheck, title: "Hygienic Preparation", sub: "Prepared with care" },
  { icon: Truck, title: "Fast & Safe Delivery", sub: "Delivered across India" },
];

function TrustBar() {
  return (
    <section className="bg-forest text-cream">
      <div className="container-x grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-cream/15">
        {BENEFITS.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-3 lg:px-6 lg:first:pl-0">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full ring-1 ring-mustard/50">
              <Icon className="h-5 w-5 text-mustard" strokeWidth={1.5} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{title}</span>
              <span className="block text-xs text-cream/70">{sub}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 grid gap-3 sm:flex sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="label-caps text-terracotta">{eyebrow}</p>}
        <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function CategorySection() {
  return (
    <section className="container-x py-16 lg:py-20">
      <SectionHeading
        eyebrow="Shop by category"
        title="Explore Our Flavours"
        subtitle="Discover the taste of authentic Andhra, one jar at a time."
        action={
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i * 70}>
            <CategoryCard {...c} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="bg-offwhite py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Best sellers"
          title="Loved by Our Customers ❤️"
          subtitle="Our most-loved Andhra favourites."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bestSellers.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComboSection() {
  return (
    <section className="container-x py-16 lg:py-20">
      <div className="grid items-center gap-8 overflow-hidden rounded-2xl bg-forest text-cream lg:grid-cols-2">
        <div className="order-2 p-8 sm:p-12 lg:order-1">
          <p className="label-caps text-mustard">Special combo</p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">{comboBox.name}</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/80">
            Can't decide where to start? Taste our most-loved Andhra favourites in one delicious box.
          </p>
          <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
            {comboBox.items.map((i) => (
              <li key={i} className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-mustard" /> {i}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-mustard">
              {formatINR(comboBox.price)}
            </span>
            <span className="text-cream/60 line-through">{formatINR(comboBox.mrp)}</span>
            <span className="rounded-full bg-terracotta px-2.5 py-1 text-[11px] font-semibold text-terracotta-foreground">
              20% OFF
            </span>
          </div>
          <Link
            to="/shop"
            className="label-caps mt-7 inline-flex items-center gap-2 rounded-md bg-mustard px-6 py-3.5 text-mustard-foreground transition-transform hover:translate-y-[-1px]"
          >
            Get the Combo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="order-1 h-full lg:order-2">
          <img
            src={comboImg}
            alt="The Andhra Starter Box with pickles, podi and snacks"
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

const WHY = [
  {
    icon: HeartHandshake,
    title: "Traditional Recipes",
    body: "Inspired by authentic Andhra family recipes, unchanged for generations.",
    image: picklesImg,
  },
  {
    icon: Sparkles,
    title: "Small-Batch Preparation",
    body: "Prepared carefully in limited batches so every jar reaches you fresh.",
    image: snacksImg,
  },
  {
    icon: Leaf,
    title: "Authentic Ingredients",
    body: "Quality spices, Guntur chillies and cold-pressed oils selected for genuine flavour.",
    image: podiImg,
  },
];

function WhyUs() {
  return (
    <section className="bg-offwhite py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Andhra Ruchulu?"
          title="Made the Traditional Way"
          subtitle="We believe great food doesn't need complicated recipes. It needs good ingredients, traditional methods and plenty of love."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {WHY.map(({ icon: Icon, title, body, image }, i) => (
            <Reveal key={title} delay={i * 80}>
              <article className="h-full overflow-hidden rounded-xl border border-border bg-card shadow-card">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="p-6">
                  <Icon className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
                  <h3 className="mt-3 font-serif text-xl font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="container-x py-16 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal className="overflow-hidden rounded-2xl shadow-card">
          <img
            src={storyImg}
            alt="Traditional Andhra kitchen where the pickles are mixed by hand"
            loading="lazy"
            width={1280}
            height={960}
            className="w-full object-cover"
          />
        </Reveal>
        <div>
          <p className="label-caps text-terracotta">Our story</p>
          <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
            From Our Kitchen to Your Table
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Andhra Ruchulu started with a simple love for the bold, unforgettable flavours of
              Andhra cuisine.
            </p>
            <p>
              What began as homemade pickles prepared for family and friends grew into a desire to
              share those authentic flavours with homes across India.
            </p>
            <p>
              Every batch is inspired by traditional recipes, homemade techniques and the belief
              that food tastes better when it is made with care.
            </p>
          </div>
          <Link
            to="/story"
            className="group mt-6 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm font-medium"
          >
            Read Our Story
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function AndhraSection() {
  return (
    <section className="relative overflow-hidden bg-terracotta/8 py-16 lg:py-20">
      <div className="container-x grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="label-caps text-terracotta">A taste of Andhra</p>
          <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
            Bold. Spicy. Tangy.
            <br />
            Unforgettable.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Guntur chillies, raw mango from the coastal belt, gongura from the backyard and
            cold-pressed sesame oil — the ingredients that make Andhra food impossible to forget.
          </p>
          <p className="label-caps mt-6 inline-block rounded-full bg-offwhite px-4 py-2 text-primary ring-1 ring-border">
            Authentically inspired by Andhra
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { img: picklesImg, label: "Raw mango & chilli" },
            { img: podiImg, label: "Stone-ground podi" },
            { img: dryImg, label: "Sun-dried staples" },
            { img: avakayaImg, label: "Hand-packed jars" },
          ].map((x, i) => (
            <Reveal key={x.label} delay={i * 70} className="overflow-hidden rounded-xl">
              <figure className="group relative overflow-hidden rounded-xl">
                <img
                  src={x.img}
                  alt={x.label}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute bottom-0 w-full bg-linear-to-t from-cocoa/80 to-transparent p-3 text-xs text-cream">
                  {x.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsStrip() {
  return (
    <section className="container-x py-16 lg:py-20">
      <SectionHeading
        eyebrow="4.9 / 5 average rating"
        title="What Our Customers Say"
        action={
          <Link to="/reviews" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            All reviews <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
      <div className="grid gap-5 md:grid-cols-3">
        {REVIEWS.slice(0, 3).map((r, i) => (
          <Reveal key={r.name} delay={i * 70}>
            <blockquote className="h-full rounded-xl border border-border bg-card p-6 shadow-card">
              <Stars rating={5} />
              <p className="mt-3 text-sm leading-relaxed">“{r.text}”</p>
              <footer className="mt-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-serif text-sm text-primary-foreground">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{r.name}</span>
                  <span className="block text-xs text-muted-foreground">{r.city}</span>
                </span>
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SocialGrid() {
  const tiles = [avakayaImg, picklesImg, snacksImg, podiImg, dryImg, storyImg];
  return (
    <section className="bg-offwhite py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="@andhraruchulu"
          title="Follow the Flavour"
          subtitle="Homemade goodness, Andhra style 🌶️"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map((t, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg"
            >
              <img
                src={t}
                alt="Andhra Ruchulu on Instagram"
                loading="lazy"
                width={512}
                height={512}
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-cocoa/0 opacity-0 transition-all group-hover:bg-cocoa/35 group-hover:opacity-100">
                <Instagram className="h-6 w-6 text-cream" />
              </span>
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="label-caps inline-flex items-center gap-2 rounded-md border border-primary px-6 py-3 text-primary"
          >
            <Instagram className="h-4 w-4" /> Follow us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="container-x py-16 lg:py-20">
      <div className="rounded-2xl bg-cream px-6 py-12 text-center ring-1 ring-border sm:px-12">
        <h2 className="font-serif text-3xl font-bold sm:text-4xl">
          Get a Little Andhra in Your Inbox 🌶️
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Sign up for new flavours, special offers and delicious updates from our kitchen.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const value = email.trim();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) || value.length > 255) {
              toast.error("Please enter a valid email address.");
              return;
            }
            setEmail("");
            toast.success("You're on the list. Welcome to the family!");
          }}
          className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            aria-label="Email address"
            className="min-w-0 flex-1 rounded-md border border-border bg-offwhite px-4 py-3.5 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="label-caps rounded-md bg-primary px-7 py-3.5 text-primary-foreground transition-colors hover:bg-forest"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
