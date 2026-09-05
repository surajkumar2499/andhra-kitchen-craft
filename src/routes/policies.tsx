import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Shipping, Returns & Policies | Andhra Ruchulu" },
      {
        name: "description",
        content:
          "Andhra Ruchulu shipping timelines, returns and refunds, privacy policy, terms and frequently asked questions about our homemade Andhra food.",
      },
      { property: "og:title", content: "Shipping, Returns & Policies | Andhra Ruchulu" },
      { property: "og:description", content: "Everything about delivery, refunds, privacy and terms for Andhra Ruchulu orders." },
    ],
  }),
  component: PoliciesPage,
});

const SECTIONS = [
  {
    id: "shipping",
    title: "Shipping Policy",
    body: [
      "Orders are packed within 48 hours and shipped pan India through tracked courier partners.",
      "Delivery usually takes 3–6 working days depending on your pincode. Remote pincodes may take longer.",
      "Delivery is free on orders above ₹999. Below that a flat ₹59 is charged at checkout.",
      "Pickle jars are sealed, shrink-wrapped and cushioned. Snacks travel in sealed pouches to stay crisp.",
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    body: [
      "Because these are freshly prepared food items, we cannot accept returns once a seal is opened.",
      "If a jar arrives damaged, leaking or incorrect, send us a photo on WhatsApp within 48 hours of delivery.",
      "Verified issues are replaced in the next dispatch or fully refunded to the original payment method within 5–7 working days.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    body: [
      "We collect only what is needed to deliver your order: name, phone, email and delivery address.",
      "Payment details are handled entirely by our payment gateway and are never stored on our servers.",
      "We never sell or rent your data. Marketing emails are sent only if you subscribe, and every email has an unsubscribe link.",
    ],
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    body: [
      "Prices are listed in Indian Rupees and are inclusive of applicable taxes.",
      "Product photographs are representative; colour and texture vary naturally between batches.",
      "Orders can be cancelled free of charge until they are packed. After dispatch, cancellation is not possible.",
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    body: [
      "How long do the pickles keep? Unopened, up to 12 months in a cool dry place. Once opened, refrigerate and use a dry spoon.",
      "How spicy are they? Genuinely Andhra spicy. Peanut podi and lemon pickle are the mildest in our range.",
      "Do you take bulk or gifting orders? Yes — message us on WhatsApp for wedding hampers and corporate gifting.",
      "Do you ship outside India? Not yet. Join the newsletter and we'll announce it there first.",
    ],
  },
];

function PoliciesPage() {
  return (
    <div className="container-x py-14 lg:py-20">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">Shipping, Returns &amp; Policies</h1>

      <nav className="mt-6 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary"
          >
            {s.title}
          </a>
        ))}
      </nav>

      <div className="mt-10 grid max-w-3xl gap-10">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28">
            <h2 className="font-serif text-2xl font-bold">{s.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
