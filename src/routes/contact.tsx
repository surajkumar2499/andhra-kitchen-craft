import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { WHATSAPP_URL } from "@/components/site/WhatsAppButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Andhra Ruchulu | Bulk Orders & Customer Support" },
      {
        name: "description",
        content:
          "Reach the Andhra Ruchulu kitchen on WhatsApp, email or phone for orders, bulk enquiries, gifting and delivery support across India.",
      },
      { property: "og:title", content: "Contact Andhra Ruchulu" },
      { property: "og:description", content: "Questions about an order, bulk gifting or delivery? Talk to our kitchen." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  return (
    <>
      <header className="bg-offwhite">
        <div className="container-x py-14 text-center lg:py-20">
          <p className="label-caps text-terracotta">Contact</p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Talk to Our Kitchen</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Orders, bulk gifting, wedding hampers or a question about spice levels — we reply within
            a day.
          </p>
        </div>
      </header>

      <div className="container-x grid gap-10 py-14 lg:grid-cols-[1fr_1.2fr] lg:py-20">
        <div className="space-y-4">
          <Info icon={MessageCircle} label="WhatsApp" value="+91 90000 00000" href={WHATSAPP_URL} />
          <Info icon={Phone} label="Phone" value="+91 90000 00000" href="tel:+919000000000" />
          <Info icon={Mail} label="Email" value="hello@andhraruchulu.in" href="mailto:hello@andhraruchulu.in" />
          <Info icon={MapPin} label="Kitchen" value="Guntur, Andhra Pradesh, India" />
          <Info icon={Clock} label="Hours" value="Mon–Sat, 9:00 AM – 7:00 PM IST" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = schema.safeParse(form);
            if (!parsed.success) {
              toast.error(parsed.error.issues[0].message);
              return;
            }
            setForm({ name: "", email: "", phone: "", message: "" });
            toast.success("Thanks! We'll get back to you within one working day.");
          }}
          className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} maxLength={80} />
            <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} maxLength={15} />
          </div>
          <div className="mt-4">
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} maxLength={255} />
          </div>
          <div className="mt-4">
            <label className="label-caps block text-muted-foreground">Message</label>
            <textarea
              rows={5}
              maxLength={1000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full rounded-md border border-border bg-offwhite px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="label-caps mt-6 w-full rounded-md bg-primary px-6 py-3.5 text-primary-foreground transition-colors hover:bg-forest"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}

function Info({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <span className="flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary">
        <Icon className="h-4 w-4 text-primary" strokeWidth={1.6} />
      </span>
      <span className="min-w-0">
        <span className="label-caps block text-muted-foreground">{label}</span>
        <span className="block text-sm">{value}</span>
      </span>
    </span>
  );
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          {body}
        </a>
      ) : (
        body
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="label-caps block text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-border bg-offwhite px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
