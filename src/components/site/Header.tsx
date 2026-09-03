import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "./Logo";
import { SearchModal } from "./SearchModal";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "Shop", to: "/shop" as const },
  { label: "Our Story", to: "/story" as const },
  { label: "Reviews", to: "/reviews" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cart = useCart();
  const wishlist = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-mustard text-mustard-foreground">
        <p className="container-x py-2 text-center text-[11px] font-medium tracking-wide sm:text-xs">
          🌶 Authentic Andhra Taste • Homemade with Love • Pan India Delivery 🌶
        </p>
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-border/70 bg-offwhite/95 backdrop-blur transition-all ${
          scrolled ? "py-1.5" : "py-3"
        }`}
      >
        <div className="container-x grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
          <Logo compact={scrolled} />

          <nav className="hidden justify-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary after:scale-x-100" }}
                className="relative text-sm font-medium text-foreground/80 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <IconBtn label="Search products" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" strokeWidth={1.6} />
            </IconBtn>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary sm:grid"
            >
              <User className="h-5 w-5" strokeWidth={1.6} />
            </Link>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative hidden h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary sm:grid"
            >
              <Heart className="h-5 w-5" strokeWidth={1.6} />
              {wishlist.slugs.length > 0 && <Badge>{wishlist.slugs.length}</Badge>}
            </Link>
            <IconBtn label="Open cart" onClick={cart.openCart}>
              <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
              {cart.count > 0 && <Badge>{cart.count}</Badge>}
            </IconBtn>
            <IconBtn label="Open menu" onClick={() => setMenuOpen(true)} className="lg:hidden">
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </IconBtn>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-cocoa/45"
          />
          <nav className="absolute top-0 right-0 flex h-full w-72 flex-col gap-1 bg-background p-5 shadow-lift">
            <div className="mb-4 flex items-center justify-between">
              <span className="label-caps text-muted-foreground">Menu</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/shop"
              search={{ category: "pickles" }}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium hover:bg-secondary"
            >
              Pickles
            </Link>
            <Link
              to="/shop"
              search={{ category: "snacks" }}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium hover:bg-secondary"
            >
              Snacks
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium hover:bg-secondary"
            >
              Wishlist
            </Link>
            <Link
              to="/account"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium hover:bg-secondary"
            >
              Account
            </Link>
          </nav>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`relative grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary ${className}`}
    >
      {children}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-terracotta-foreground">
      {children}
    </span>
  );
}
