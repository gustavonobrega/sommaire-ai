"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UploadForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form
      className="flex flex-col gap-6 w-full max-w-2xl "
      onSubmit={handleSubmit}
    >
      <div className="flex justify-end items-center gap-1.5">
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required
        />
        <Button>Upload your PDF</Button>
      </div>
    </form>
  );
}
