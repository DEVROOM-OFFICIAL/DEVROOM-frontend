import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "@/utils/provider";

export const metadata: Metadata = {
  title: {
    default: "DevRoom",
    template: "DevRoom| %s",
  },
  icons: [{ url: "/favicon.ico", sizes: "any" }],
};

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
