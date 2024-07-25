"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Flowbite } from "flowbite-react";
import { Toaster } from "@/components/ui/sonner";
import "rsuite/dist/rsuite-no-reset.min.css";
import { Provider } from "jotai";
import { JotaiProvider, store } from "@repo/store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <JotaiProvider store={store}>
        <Flowbite>
          <html lang="en">
            <body className={poppins.className}>{children}</body>
            <Toaster />
          </html>
        </Flowbite>
      </JotaiProvider>
    </ClerkProvider>
  );
}
