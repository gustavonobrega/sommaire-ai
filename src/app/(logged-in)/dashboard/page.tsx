import Link from "next/link";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UPLOAD_LIMIT } from "@/utils/constants";
import EmptySummary from "@/components/dashboard/empty-summary";
import SummaryCard from "@/components/dashboard/summary-card";
import { getSummaries } from "@/lib/neon-db/summaries";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const { success, data: summaries, error } = await getSummaries(user.id);

  if (!success) {
    throw new Error(error ? error : "Something went wrong!");
  }

  return (
    <section className="min-h-screen">
      <div className="container flex flex-col gap-8 py-12 sm:py-24">
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-950 bg-clip-text text-transparent">
              Your Summaries
            </h1>
            <p className="text-gray-600">
              Transform your PDFs into concise, actionable insights
            </p>
          </div>
          <Button
            variant={"link"}
            className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 hover:no-underline"
            asChild
          >
            <Link
              href="/upload"
              className="flex 
              items-center text-white"
            >
              <Plus />
              New Summary
            </Link>
          </Button>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
          <p className="text-sm">
            You&apos;ve reached the limit of {UPLOAD_LIMIT} uploads on the Basic
            plan.{" "}
            <Link
              href="/#pricing"
              className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
            >
              Click here to upgrade to Pro
              <ArrowUpRight className="w-4 h-4" />
            </Link>{" "}
            for unlimited uploads.
          </p>
        </div>

        {summaries?.length === 0 ? (
          <div className="text-center pt-12 pb-24">
            <EmptySummary />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {summaries?.map((summary) => (
              <SummaryCard key={summary.id} summary={summary} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
