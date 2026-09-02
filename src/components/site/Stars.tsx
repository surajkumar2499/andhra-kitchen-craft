import { Star } from "lucide-react";

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 text-mustard"
          fill={i <= Math.round(rating) ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
