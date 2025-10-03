import React, { type ElementType, type ReactNode } from "react";
import { Badge } from "../ui/badge";

interface GradientBadge {
  icon?: ElementType;
  children: ReactNode;
}

export default function GradientBadge({ icon: Icon, children }: GradientBadge) {
  return (
    <div className="relative p-[1.5px] overflow-hidden rounded-full bg-linear-to-r from-rose-300 via-rose-500 to-rose-800">
      <Badge
        variant="secondary"
        className="flex gap-3 px-6 py-2 text-base text-rose-600 rounded-full [&>svg]:size-6 bg-white pointer-events-none"
      >
        {Icon && <Icon className="animate-pulse" />}
        {children}
      </Badge>
    </div>
  );
}
