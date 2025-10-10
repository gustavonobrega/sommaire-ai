"use client";

import { Loader } from "lucide-react";
import { useRef, useState } from "react";

import { toast } from "sonner";
import { z } from "zod";

import { generatePdfSummary } from "@/actions/upload-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadThing } from "@/lib/uploadthing";

const uploadFileSchema = z.object({
  file: z
    .file({ error: " Invalid file" })
    .max(20 * 1024 * 1024, { error: "File size should be less than 20MB" })
    .mime("application/pdf", { error: "File must be a PDF" }),
});

export default function UploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { startUpload } = useUploadThing("pdfUploader", {
    onUploadBegin: (fileName) => {
      toast("📄 Uploading PDF", {
        description: "Upload has begun for: " + fileName,
      });
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      const validatedFields = uploadFileSchema.safeParse({ file });

      if (!validatedFields.success) {
        toast.error("Something went wrong", {
          description:
            z.flattenError(validatedFields.error).fieldErrors.file?.[0] ??
            "Invalid file",
        });
        return;
      }

      const uploadResponse = await startUpload([file]);
      if (!uploadResponse) {
        toast.error("Something went wrong", {
          description:
            "Error occured while uploading the PDF, please try again...",
        });
        return;
      }

      const { ufsUrl: fileUrl } = uploadResponse[0];

      toast("📄 Processing PDF", {
        description: "Hang tight! our AI is processing your document ⚡️",
      });

      const { success, data } = await generatePdfSummary(fileUrl);

      if (success === false && !data) {
        toast.error("Something went wrong", {
          description:
            "Error occured while summarizing the PDF, please try again...",
        });
        formRef.current?.reset();
        return;
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later...");
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-6 w-full max-w-2xl "
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="flex justify-end items-center gap-1.5">
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required
          disabled={isLoading}
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="mr-1 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Upload your PDF"
          )}
        </Button>
      </div>
    </form>
  );
}
