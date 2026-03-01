import type { Metadata } from "next";
import "kz-design-system/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "kz-design-system",
  description: "Documentation for kz-design-system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
