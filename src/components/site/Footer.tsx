import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";

import { LogoMark } from "./Logo";
import { WHATSAPP_URL } from "./WhatsAppButton";

export function Footer() {
  return (
    <footer className="mt-20 bg-forest text-cream/85">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <span>
              <span className="block font-serif text-xl font-bold text-cream">Andhra Ruchulu</span>
              <span className="text-[10px] tracking-[0.18em] uppercase">Homemade Pickles &amp; Snacks</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            From our Andhra kitchen to your home. Traditional recipes, small batches and the bold
            flavours Andhra cuisine is known for.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["UPI", "Visa", "Mastercard", "Razorpay"].map((m) => (
              <span
                key={m}
                className="rounded border border-cream/25 px-2.5 py-1 text-[11px] tracking-wide text-cream/75"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <Column title="Shop">
          <FLink to="/shop">All Products</FLink>
          <FLink to="/shop" search={{ category: "pickles" }}>
            Pickles
          </FLink>
          <FLink to="/shop" search={{ category: "snacks" }}>
            Snacks
          </FLink>
          <FLink to="/shop" search={{ category: "podi" }}>
            Podi &amp; Powders
          </FLink>
          <FLink to="/shop" search={{ category: "dry-items" }}>
            Dry Items
          </FLink>
        </Column>

        <Column title="About">
          <FLink to="/story">Our Story</FLink>
          <FLink to="/reviews">Reviews</FLink>
          <FLink to="/contact">Contact Us</FLink>
          <FLink to="/policies" hash="shipping">
            Shipping Policy
          </FLink>
          <FLink to="/policies" hash="returns">
            Returns &amp; Refunds
          </FLink>
        </Column>

        <Column title="Customer Care">
          <FLink to="/policies" hash="privacy">
            Privacy Policy
          </FLink>
          <FLink to="/policies" hash="terms">
            Terms &amp; Conditions
          </FLink>
          <FLink to="/policies" hash="faq">
            FAQ
          </FLink>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cream">
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
          <a href="mailto:hello@andhraruchulu.in" className="flex items-center gap-2 hover:text-cream">
            <Mail className="h-3.5 w-3.5" /> hello@andhraruchulu.in
          </a>
          <a href="tel:+919000000000" className="flex items-center gap-2 hover:text-cream">
            <Phone className="h-3.5 w-3.5" /> +91 90000 00000
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cream">
            <Instagram className="h-3.5 w-3.5" /> Instagram
          </a>
        </Column>
      </div>

      <div className="border-t border-cream/15">
        <p className="container-x py-5 text-center text-xs text-cream/60">
          © 2026 Andhra Ruchulu. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label-caps text-mustard">{title}</h3>
      <div className="mt-4 flex flex-col gap-2.5 text-sm">{children}</div>
    </div>
  );
}

function FLink(props: React.ComponentProps<typeof Link>) {
  return <Link {...props} className="transition-colors hover:text-cream" />;
}
