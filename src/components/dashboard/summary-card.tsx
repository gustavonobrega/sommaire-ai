import Link from "next/link";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import type { SummaryType } from "@/types/database";

const SummaryHeader = ({
  title,
  createdAt,
}: {
  title: string;
  createdAt: Date;
}) => {
  return (
    <div className="flex gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {formatDistanceToNow(createdAt, {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800",
      )}
    >
      {status}
    </span>
  );
};

export default function SummaryCard({ summary }: { summary: SummaryType }) {
  return (
    <Card className="relative h-full hover:scale-105 transition-transform">
      <div className="absolute top-6 right-2">
        <DeleteButton summaryId={summary.id} />
      </div>
      <Link href={`summaries/${summary.id}`} className="flex flex-col px-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <SummaryHeader title={summary.title} createdAt={summary.created_at} />
          <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
            {summary.summary_text}
          </p>
          <div className="flex justify-between items-center mt-2 sm:mt-4">
            <StatusBadge status={summary.status} />
          </div>
        </div>
      </Link>
    </Card>
  );
}
