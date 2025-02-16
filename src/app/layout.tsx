import { geistMono, geistSans } from "@/assets/font";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polling App",
  description: "Createed by ABhay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
