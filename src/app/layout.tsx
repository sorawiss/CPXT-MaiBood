import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/context/QueryProvider";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "MaiBood",
  description: "MaiBood is a food management system",
  icons: {
    icon: "/favicon-light.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansThai.className} antialiased `}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
