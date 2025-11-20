import React from "react";

interface UploadSeparatorProps {
  text: string;
}

export default function UploadSeparator({ text }: UploadSeparatorProps) {
  return (
    <div className="w-full max-w-2xl">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
