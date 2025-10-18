import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 px-8 py-12 bg-linear-to-b from-rose-50/40 to-white">
      <h1>Summary Not Found</h1>
      <p className="text-gray-500">
        The summary you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
