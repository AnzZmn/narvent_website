import React from "react";
import { cn } from "@/lib/utils";

interface HorizontalGlowLineProps {
  className?: string;
  color?: string; // Tailwind color or hex (e.g., "from-cyan-500", "via-indigo-500")
  animated?: boolean;
}

export function HorizontalGlowLine({
  className,
  color = "from-transparent via-cyan-500 to-transparent",
  animated = true,
}: HorizontalGlowLineProps) {
  return (
    <div className={cn("relative w-full overflow-hidden py-4", className)}>
      {/* Base subtle line */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full" />
      </div>

      {/* Glowing line segment */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            "h-[2px] w-3/4 bg-gradient-to-r blur-[1px]",
            color,
            animated && "animate-pulse",
          )}
        />
      </div>

      {/* Intense core beam */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={cn("h-[1px] w-1/2 bg-gradient-to-r", color)} />
      </div>
    </div>
  );
}
