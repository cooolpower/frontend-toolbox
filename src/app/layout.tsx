import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/language";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Toolbox - Advanced Developer Productivity Platform",
  description:
    "A premium suite of tools designed specifically for React, TypeScript, and UI Engineering workflows. Free, fast, and secure.",
  keywords: [
    "react tools",
    "typescript helpers",
    "css shadow generator",
    "props diff viewer",
    "frontend toolbox",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* 구글 애드센스 정적 스크립트 태그 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7653756543790258"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <LanguageProvider>
          <ThemeProvider>
            <div className="appContainer">
              <Header />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
