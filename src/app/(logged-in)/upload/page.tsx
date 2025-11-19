import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import { hasReachedUploadLimit } from "@/lib/neon-db/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { hasReachedLimit } = await hasReachedUploadLimit(
    user?.id,
    user?.emailAddresses?.[0]?.emailAddress,
  );

  if (hasReachedLimit) {
    redirect("/dashboard");
  }

  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
}
