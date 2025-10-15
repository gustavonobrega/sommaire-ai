"use server";

import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { getDbConnection } from "@/lib/neon-db/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

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

export async function storePdfSummary({
  fileUrl,
  fileName,
  title,
  summary,
}: PdfSummaryType) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }

    const sql = await getDbConnection();
    const [savedSummary] =
      await sql`INSERT INTO pdf_summaries(user_id, original_file_url, summary_text, title, file_name)
         VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}) RETURNING id, summary_text`;

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary",
        data: null,
      };
    }

    revalidatePath(`/summaries/${savedSummary.id}`);

    return {
      success: true,
      message: "PDF Summary saved successfully",
      data: {
        id: savedSummary.id,
      },
    };
  } catch (error) {
    console.error("Failed to store PDF Summary", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
      data: null,
    };
  }
}
