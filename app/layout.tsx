import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@context/CartContext'
import Navbar from '@components/Navbar';
import { SessionProvider } from "next-auth/react"
import { auth } from "../auth"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Art.Nicolas Troadec",
  description: "La boutique officielle de Nicolas Troadec",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en" className="bg-white">
      <SessionProvider>
        <body className={inter.className + " bg-white"}>
          <CartProvider>
            <Navbar sessionProp={session} />
            <div className="mt-20  w-[80%] m-auto">{children}</div>
          </CartProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
