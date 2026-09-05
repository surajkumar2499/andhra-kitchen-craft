import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Truck, UserRound } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account | Andhra Ruchulu" },
      { name: "description", content: "Track Andhra Ruchulu orders, manage delivery addresses and review past purchases." },
      { property: "og:title", content: "Your Account | Andhra Ruchulu" },
      { property: "og:description", content: "Order tracking and account details for Andhra Ruchulu customers." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <div className="container-x py-14 lg:py-20">
      <p className="label-caps text-terracotta">Account</p>
      <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Your Andhra Ruchulu Account</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Sign-in, saved addresses and order history are not switched on yet. Until then, we send every
        order update by email and WhatsApp.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {[
          { icon: UserRound, t: "Profile", d: "Save your name, phone and delivery addresses for faster checkout." },
          { icon: Package, t: "Orders", d: "See past orders, reorder favourites and download invoices." },
          { icon: Truck, t: "Tracking", d: "Live courier tracking from our kitchen to your doorstep." },
        ].map(({ icon: Icon, t, d }) => (
          <article key={t} className="rounded-xl border border-border bg-card p-6 shadow-card">
            <Icon className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
            <h2 className="mt-3 font-serif text-xl font-bold">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            <p className="label-caps mt-4 text-muted-foreground">Coming soon</p>
          </article>
        ))}
      </div>

      <Link to="/shop" className="label-caps mt-10 inline-flex rounded-md bg-primary px-6 py-3.5 text-primary-foreground">
        Continue shopping
      </Link>
    </div>
  );
}
