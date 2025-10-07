"use client";

import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadThing } from "@/lib/uploadthing";
import { useRef, useState } from "react";
import { Loader } from "lucide-react";

const uploadFileSchema = z.object({
  file: z
    .file({ error: " Invalid file" })
    .max(20 * 1024 * 1024, { error: "File size should be less than 20MB" })
    .mime("application/pdf", { error: "File must be a PDF" }),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload } = useUploadThing("pdfUploader", {
    onUploadBegin: (fileName) => {
      toast("📄 Uploading PDF", {
        description: "Upload has begun for: " + fileName,
      });
    },
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast.error("Error occured while uploading", {
        description: err.message,
      });
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

      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Something went wrong", {
          description: "Please use different type",
        });
        return;
      }
    } catch (error) {
      console.error("Error occured", error);
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
