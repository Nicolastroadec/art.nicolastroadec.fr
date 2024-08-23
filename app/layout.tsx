import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/app/(ui)/components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Art.Nicolas Troadec",
  description: "La boutique officielle de Nicolas Troadec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body className={inter.className + " bg-white"}>
        <Navbar />
        <div className="mt-20">{children}</div>
      </body>
    </html>
  );
}
