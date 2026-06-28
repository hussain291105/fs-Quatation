import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Commercial Quotation - FS Enterprises",
  description: "Tissue Supply Quotation for Hatimi Retreats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
