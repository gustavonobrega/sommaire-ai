import { Sparkles } from "lucide-react";
import GradientBadge from "../common/gradient-badge";
import HighlightedText from "../common/highlighted-text";

export default function UploadHeader() {
  return (
    <>
      <GradientBadge icon={Sparkles}>AI-Powered Content Creation</GradientBadge>
      <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Start Uploading <HighlightedText>Your PDF&apos;s</HighlightedText>
        <div className="mt-3 text-lg leading-8 text-gray-600 max-w-2xl text-center">
          <p>Upload your PDF and let our AI do the magic!</p>
        </div>
      </div>
    </>
  );
}
