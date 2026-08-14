import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display font — geometric, characterful, stands out from generic Inter portfolios
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

// Body font — clean, highly readable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

// Mono font — for labels, code elements, UI accents
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Aditya Devmurari | Full Stack & AI Developer",
  description:
    "Aditya Devmurari is a Full Stack & AI Developer with 2+ years of experience building scalable web applications, AI/ML pipelines, and blockchain systems. Based in Gujarat, India.",
  keywords: [
    "Aditya Devmurari",
    "Full Stack Developer",
    "AI Developer",
    "React",
    "Next.js",
    "Python",
    "Machine Learning",
    "Blockchain",
    "Solidity",
    "ETH.VOTE",
    "Gujarat India",
  ],
  authors: [{ name: "Aditya Devmurari", url: "https://adityadevmurari.vercel.app" }],
  creator: "Aditya Devmurari",
  metadataBase: new URL("https://adityadevmurari.vercel.app"),
  openGraph: {
    type: "website",
    url: "https://adityadevmurari.vercel.app",
    title: "Aditya Devmurari | Full Stack & AI Developer",
    description:
      "Full Stack & AI Developer — Next.js, Python, Solidity, Machine Learning. 2+ years building production software. Gujarat, India.",
    siteName: "Aditya Devmurari Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Devmurari | Full Stack & AI Developer",
    description:
      "Full Stack & AI Developer — Next.js, Python, Solidity, Machine Learning. 2+ years building production software.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body bg-[#050812] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
