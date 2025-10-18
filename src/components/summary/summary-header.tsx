import { Calendar, ChevronLeft, Clock, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";

export function SummaryHeader({
  title,
  createdAt,
  readingTime,
}: {
  title: string;
  createdAt: Date;
  readingTime: string;
}) {
  return (
    <div className="flex gap-4 mb-4 justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Badge
            variant="secondary"
            className="px-4 py-1.5 text-sm font-medium
            bg-white/80 rounded-full hover:bg-white/90
            transition-all duration-200 shadow-xs hover:shadow-md"
          >
            <Sparkles className="h-4 w-4 mr-1.5 text-rose-500" />
            AI Summary
          </Badge>
          <div className="flex items-center gap-2 leading-0 text-sm  text-muted-foreground">
            <Calendar className="h-4 w-4 text-rose-400" />
            {createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2 leading-0 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-rose-400" />
            {readingTime} min read
          </div>
        </div>
        <h1
          className="text-2xl lg:text-4xl lg:tracking-tight bg-linear-to-r from-rose-600
            to-orange-600 bg-clip-text text-transparent"
        >
          {title}
        </h1>
      </div>

      <Button
        asChild
        variant="link"
        size="sm"
        className="group flex items-center gap-1 hover:bg-white/80 rounded-full
                transition-all duration-200 shadow-xs hover:shadow-md border
                border-rose-100/30 bg-rose-100 px-2 sm:px-3 hover:no-underline"
      >
        <Link href="/dashboard">
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500 transition-transform group-hover:-translate-x-0.5" />
          <span className="text-sm text-muted-foreground leading-0 font-medium">
            Back <span className="hidden sm:inline">to Dashboard</span>
          </span>
        </Link>
      </Button>
    </div>
  );
}
