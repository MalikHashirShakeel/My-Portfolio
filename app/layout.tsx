import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
