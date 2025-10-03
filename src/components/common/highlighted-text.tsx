import React, { type ReactNode } from "react";

interface HighlightedTextProps {
  children: ReactNode;
}

export default function HighlightedText({ children }: HighlightedTextProps) {
  return (
    <span className="relative inline-block">
      <span
        className="absolute inset-0 bg-rose-200/50 -skew-3 -skew-y-1 -rotate-2 rounded-lg"
        aria-hidden="true"
      ></span>
      <span className="relative px-2">{children}</span>
    </span>
  );
}
