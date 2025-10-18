import { SourceInfo } from "@/components/summary/source-info";
import { SummaryHeader } from "@/components/summary/summary-header";
import { SummaryViewer } from "@/components/summary/summary-viewer";
import { getSummaryById } from "@/lib/neon-db/summaries";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";

export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { data: summary } = await getSummaryById(params.id);
  if (!summary) {
    notFound();
  }

  const readingTime = Math.ceil((summary.word_count || 0) / 200);

  return (
    <section className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <div className="container mx-auto flex flex-col gap-4 px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
        <SummaryHeader
          title={summary.title}
          createdAt={summary.created_at}
          readingTime={readingTime.toString()}
        />

        {summary.file_name && (
          <SourceInfo
            title={summary.title}
            summaryText={summary.summary_text}
            fileName={summary.file_name}
            createdAt={summary.created_at}
            originalFileUrl={summary.original_file_url}
          />
        )}
        <div className="relative mt-4 sm:mt-8 lg:mt-16">
          <div
            className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md
              rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all
              duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto"
          >
            <div
              className="absolute inset-0 bg-linear-to-br from-rose-50/50
                via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl"
            />
            <div
              className="absolute top-2 sm:top-4 right-2 flex items-center
                gap-1.5 text-xs sm:text-sm text-muted-foreground
                bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
              {summary.word_count.toLocaleString()} words
            </div>
            <div className="relative mt-6 sm:mt-8 flex justify-center">
              <SummaryViewer summary={summary.summary_text} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
