import type { Metadata } from "next";
import { Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Malik Hashir | AI Engineer & Deep Learning Specialist",
  description:
    "Portfolio of Malik Hashir — AI Engineer, Deep Learning Specialist, and System Builder. Specializing in Machine Learning, Neural Networks, and Full-Stack Development.",
  keywords: [
    "AI Engineer",
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
    title: "Malik Hashir | AI Engineer & Deep Learning Specialist",
    description:
      "Portfolio of Malik Hashir — AI Engineer, Deep Learning Specialist, and System Builder.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malik Hashir | AI Engineer & Deep Learning Specialist",
    description:
      "Portfolio of Malik Hashir — AI Engineer, Deep Learning Specialist, and System Builder.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`} suppressHydrationWarning>
      <body
        className={exo2.className}
        style={{ fontFamily: "var(--font-exo2), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
