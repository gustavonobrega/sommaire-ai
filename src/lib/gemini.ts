import { GoogleGenAI } from "@google/genai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function generateSummaryFromGemini(pdfText: string) {
  try {
    const modelName = "gemini-2.5-flash";
    const contents = [
      { text: SUMMARY_SYSTEM_PROMPT },
      {
        text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
      },
    ];
    const generationConfig = {
      temperature: 0.7,
      maxOutputTokens: 1500,
    };

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: generationConfig,
    });

    if (!response.text) {
      throw new Error("Empty response from Gemini API");
    }

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
  }
}
