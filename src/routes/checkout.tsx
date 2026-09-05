import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { DELIVERY_FEE, useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Andhra Ruchulu" },
      {
        name: "description",
        content: "Complete your Andhra Ruchulu order — UPI, cards, net banking or cash on delivery, shipped across India.",
      },
      { property: "og:title", content: "Checkout | Andhra Ruchulu" },
      { property: "og:description", content: "Secure checkout for homemade Andhra pickles, snacks and podi." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.string().trim().regex(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  address: z.string().trim().min(8, "Please enter your full address").max(300),
  city: z.string().trim().min(2, "Please enter your city").max(60),
  state: z.string().trim().min(2, "Please enter your state").max(60),
  pincode: z.string().trim().regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit pincode"),
  notes: z.string().trim().max(300).optional(),
});

const PAYMENTS = [
  { id: "upi", label: "UPI", hint: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Credit / Debit Card", hint: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking", hint: "All major Indian banks" },
  { id: "cod", label: "Cash on Delivery", hint: "₹25 handling fee" },
];

function Checkout() {
  const cart = useCart();
  const [payment, setPayment] = useState("upi");
  const [placed, setPlaced] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  const codFee = payment === "cod" && cart.subtotal > 0 ? 25 : 0;
  const total = cart.total + codFee;

  if (placed) {
    return (
      <div className="container-x py-24 text-center">
        <p className="label-caps text-terracotta">Order confirmed</p>
        <h1 className="mt-3 font-serif text-4xl font-bold">Thank you! 🌶</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Your order <strong className="text-foreground">{placed}</strong> is confirmed. We've sent a
          confirmation to your email and will WhatsApp you the tracking link once it ships.
        </p>
        <Link to="/shop" className="label-caps mt-8 inline-flex rounded-md bg-primary px-6 py-3.5 text-primary-foreground">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (cart.lines.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-serif text-3xl font-bold">Your basket is empty</h1>
        <p className="mt-3 text-muted-foreground">Add a jar or two and come back.</p>
        <Link to="/shop" className="label-caps mt-8 inline-flex rounded-md bg-primary px-6 py-3.5 text-primary-foreground">
          Shop all products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-12 lg:py-16">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">Checkout</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const parsed = schema.safeParse(form);
          if (!parsed.success) {
            toast.error(parsed.error.issues[0]!.message);
            return;
          }
          const id = `AR${Date.now().toString().slice(-8)}`;
          cart.clear();
          setPlaced(id);
          toast.success("Order placed successfully");
        }}
        className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]"
      >
        <div className="space-y-8">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
            <h2 className="font-serif text-xl font-bold">Delivery details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} maxLength={80} />
              <Field label="Mobile number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} maxLength={10} inputMode="numeric" />
              <div className="sm:col-span-2">
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} maxLength={255} />
              </div>
              <div className="sm:col-span-2">
                <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} maxLength={300} />
              </div>
              <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} maxLength={60} />
              <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} maxLength={60} />
              <Field label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} maxLength={6} inputMode="numeric" />
              <div className="sm:col-span-2">
                <Field
                  label="Delivery instructions (optional)"
                  value={form.notes}
                  onChange={(v) => setForm({ ...form, notes: v })}
                  maxLength={300}
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
            <h2 className="font-serif text-xl font-bold">Payment method</h2>
            <div className="mt-5 grid gap-3">
              {PAYMENTS.map((p) => (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3.5 transition-colors ${
                    payment === p.id ? "border-primary bg-secondary" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === p.id}
                    onChange={() => setPayment(p.id)}
                    className="accent-[var(--primary)]"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{p.label}</span>
                    <span className="block text-xs text-muted-foreground">{p.hint}</span>
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Online payments are processed through a secure payment gateway. No card details are
              stored on our servers.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-offwhite p-6 shadow-card lg:sticky lg:top-28">
          <h2 className="font-serif text-xl font-bold">Order summary</h2>
          <div className="mt-5 space-y-4">
            {cart.lines.map((l) => (
              <div key={l.id} className="flex gap-3">
                <img src={l.image} alt={l.name} loading="lazy" width={120} height={120} className="h-16 w-16 rounded object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{l.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {l.weight} × {l.qty}
                  </span>
                </span>
                <span className="text-sm font-semibold">{formatINR(l.unitPrice * l.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <Row label="Subtotal" value={formatINR(cart.subtotal)} />
            {cart.savings > 0 && <Row label="Discount" value={`− ${formatINR(cart.savings)}`} />}
            <Row label="Delivery" value={cart.delivery === 0 ? "Free" : formatINR(DELIVERY_FEE)} />
            {codFee > 0 && <Row label="COD handling" value={formatINR(codFee)} />}
            <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
          <button
            type="submit"
            className="label-caps mt-6 w-full rounded-md bg-primary px-6 py-4 text-primary-foreground transition-colors hover:bg-forest"
          >
            Place order · {formatINR(total)}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  maxLength,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  maxLength?: number;
  inputMode?: "text" | "numeric";
}) {
  return (
    <label className="block">
      <span className="label-caps block text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-border bg-offwhite px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
