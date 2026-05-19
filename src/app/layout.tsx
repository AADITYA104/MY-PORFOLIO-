import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

export const metadata: Metadata = {
  title: "Aditya Devmurari | Full Stack & AI Architect",
  description: "Personal Portfolio of Aditya Devmurari - Full Stack & AI Architect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#050505] text-white antialiased selection:bg-[#00b4d8] selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
