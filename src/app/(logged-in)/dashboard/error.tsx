"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container flex flex-col gap-8 py-12 sm:py-24 items-center">
      <h2>Something went wrong!</h2>
      <Button
        variant={"link"}
        className="bg-linear-to-r w-fit text-white from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline transition-colors duration-300"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}
