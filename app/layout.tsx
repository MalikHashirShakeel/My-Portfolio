import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Malik Hashir | AI / ML Engineer & Deep Learning Specialist",
  description:
    "Portfolio of Malik Hashir — AI / ML Engineer, Deep Learning Specialist, and System Builder. Specializing in Machine Learning, Neural Networks, and Full-Stack Development.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Deep Learning",
    "Machine Learning",
    "Portfolio",
    "Malik Hashir",
    "TensorFlow",
    "PyTorch",
    "Next.js",
  ],
  authors: [{ name: "Malik Hashir" }],
  openGraph: {
    title: "Malik Hashir | AI / ML Engineer & Deep Learning Specialist",
    description:
      "Portfolio of Malik Hashir — AI / ML Engineer, Deep Learning Specialist, and System Builder.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malik Hashir | AI / ML Engineer & Deep Learning Specialist",
    description:
      "Portfolio of Malik Hashir — AI / ML Engineer, Deep Learning Specialist, and System Builder.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className={inter.className}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
