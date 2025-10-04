export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-5xl mx-auto py-12 lg:py-24 px-4 sm:px-6 lg:px-8 lg:pt-12">
      {children}
    </div>
  );
}
