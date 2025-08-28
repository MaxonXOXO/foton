import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foton Labz — Motion-first Website",
  description: "Original Framer-style site with animations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
