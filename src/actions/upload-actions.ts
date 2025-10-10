"use server";

import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";

export async function generatePdfSummary(pdfUrl: string) {
  if (!pdfUrl) {
    return {
      success: false,
      message: "PDF URL does not exists",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    if (!pdfText) {
      return {
        success: false,
        message: "Failed to extract PDF",
        data: null,
      };
    }

    const summary = await generateSummaryFromGemini(pdfUrl);
    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated succesfully",
      data: {
        summary,
      },
    };
  } catch (error) {
    console.error("Failed to generate PDF Summary", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "File upload failed",
      data: null,
    };
  }
}
