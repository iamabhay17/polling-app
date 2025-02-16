import "@/styles/globals.css";

import type { Metadata } from "next";
import { QueryProvider } from "@/clients/query";
import { geistMono, geistSans } from "@/assets/font";
import { Toaster } from "@/components/ui/sonner";

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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <QueryProvider>
          <div className="container mx-auto">{children}</div>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
