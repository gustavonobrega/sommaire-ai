"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { NavigationControls } from "./navigation-controls";
import { parseSection } from "@/utils/summary-helpers";
import ViewerContent from "./viewer-content";
import ProgressBar from "./progress-bar";

export function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  const handleNext = () =>
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));

  const handlePrevious = () =>
    setCurrentSection((prev) => Math.max(prev - 1, 0));

  const sections = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  return (
    <Card
      className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px]
    w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background
    via-background/95 to-rose-500/5 shadow-2xl rounded-3xl border border-rose-500/10"
    >
      <ProgressBar sections={sections} currentSection={currentSection} />
      <div className="h-full overflow-y-auto pb-20 sm:pb-24 px-4 sm:px-6">
        <ViewerTitle title={sections[currentSection]?.title || ""} />
        <ViewerContent points={sections[currentSection]?.points || []} />
      </div>

      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
}

const ViewerTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col pt-12 gap-2 mb-6 sticky top-0 pb-4 bg-background/80 backdrop-blur-xs z-10">
      <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
        {title}
      </h2>
    </div>
  );
};
