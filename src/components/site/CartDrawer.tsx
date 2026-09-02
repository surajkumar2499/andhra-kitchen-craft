import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";

import { DELIVERY_FEE, FREE_DELIVERY_ABOVE, useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export function CartDrawer() {
  const cart = useCart();

  useEffect(() => {
    if (!cart.isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cart]);

  if (!cart.isOpen) return null;

  const remaining = FREE_DELIVERY_ABOVE - cart.subtotal;

  return (
    <div className="fixed inset-0 z-60">
      <button
        aria-label="Close cart"
        onClick={cart.closeCart}
        className="absolute inset-0 bg-cocoa/45 backdrop-blur-[2px]"
      />
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-background shadow-lift">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 font-serif text-lg font-bold">
            <ShoppingBag className="h-5 w-5 text-primary" strokeWidth={1.7} />
            Your Basket ({cart.count})
          </h2>
          <button onClick={cart.closeCart} aria-label="Close cart" className="p-1 text-muted-foreground">
            <X className="h-5 w-5" />
          </button>
        </header>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <p className="font-serif text-xl">Your basket is empty</p>
            <p className="text-sm text-muted-foreground">
              Start with our most-loved Avakaya, or browse the full shelf.
            </p>
            <Link
              to="/shop"
              onClick={cart.closeCart}
              className="label-caps mt-2 rounded-md bg-primary px-5 py-3 text-primary-foreground"
            >
              Shop all products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {cart.subtotal < FREE_DELIVERY_ABOVE && (
                <p className="rounded-md bg-accent px-3 py-2 text-xs text-accent-foreground">
                  Add {formatINR(remaining)} more for free delivery across India.
                </p>
              )}
              {cart.lines.map((line) => (
                <div key={line.id} className="flex gap-3">
                  <img
                    src={line.image}
                    alt={line.name}
                    loading="lazy"
                    width={160}
                    height={160}
                    className="h-20 w-20 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{line.name}</p>
                    <p className="text-xs text-muted-foreground">{line.weight}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-md border border-border">
                        <button
                          onClick={() => cart.setQty(line.id, line.qty - 1)}
                          aria-label="Decrease quantity"
                          className="px-2 py-1.5"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm">{line.qty}</span>
                        <button
                          onClick={() => cart.setQty(line.id, line.qty + 1)}
                          aria-label="Increase quantity"
                          className="px-2 py-1.5"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => cart.remove(line.id)}
                        aria-label={`Remove ${line.name}`}
                        className="text-muted-foreground transition-colors hover:text-terracotta"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">{formatINR(line.unitPrice * line.qty)}</p>
                </div>
              ))}
            </div>

            <footer className="space-y-2 border-t border-border px-5 py-4">
              <Row label="Subtotal" value={formatINR(cart.subtotal)} />
              {cart.savings > 0 && (
                <Row label="You save" value={`− ${formatINR(cart.savings)}`} accent />
              )}
              <Row
                label="Delivery"
                value={cart.delivery === 0 ? "Free" : formatINR(DELIVERY_FEE)}
              />
              <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
                <span>Total</span>
                <span>{formatINR(cart.total)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={cart.closeCart}
                className="label-caps mt-2 block rounded-md bg-primary px-5 py-3.5 text-center text-primary-foreground transition-colors hover:bg-forest"
              >
                Proceed to Checkout
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "text-terracotta" : ""}>{value}</span>
    </div>
  );
}
