import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="flex justify-center items-center">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <SignUp />
      </div>
    </section>
  );
}
