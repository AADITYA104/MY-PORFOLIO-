import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

export const metadata: Metadata = {
  title: "Aditya Devmurari | Full Stack & AI Developer",
  description: "Aditya Devmurari is a Full Stack & AI Developer with 2+ years of experience building scalable web applications, AI/ML pipelines, and blockchain systems. Based in Gujarat, India.",
  keywords: ["Aditya Devmurari", "Full Stack Developer", "AI Developer", "React", "Next.js", "Python", "Machine Learning", "Blockchain", "Solidity", "ETH.VOTE", "Gujarat India"],
  authors: [{ name: "Aditya Devmurari", url: "https://adityadevmurari.vercel.app" }],
  creator: "Aditya Devmurari",
  metadataBase: new URL("https://adityadevmurari.vercel.app"),
  openGraph: {
    type: "website",
    url: "https://adityadevmurari.vercel.app",
    title: "Aditya Devmurari | Full Stack & AI Developer",
    description: "Full Stack & AI Developer — Next.js, Python, Solidity, Machine Learning. 2+ years building production software. Gujarat, India.",
    siteName: "Aditya Devmurari Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Devmurari | Full Stack & AI Developer",
    description: "Full Stack & AI Developer — Next.js, Python, Solidity, Machine Learning. 2+ years building production software.",
    creator: "@adityadevmurari",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
