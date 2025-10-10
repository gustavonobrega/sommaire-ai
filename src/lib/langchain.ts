import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`,
      );
    }
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const loader = new PDFLoader(new Blob([arrayBuffer]));
    const docs = await loader.load();

    return docs.map((docs) => docs.pageContent).join("\n");
  } catch (error) {
    console.error("Extract PDF Error:", error);
  }
}
