import NavbarComponent from "@/components/navbar";
import SidebarComponent from "@/components/sidebar";
import ProgressProvider from "@/providers/progressBarProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProgressProvider>
      <main className="flex overflow-hidden ">
        <SidebarComponent />
        <section className="flex dark:bg-gray-900  bg-gray-50  flex-col min-w-full">
          <NavbarComponent />
          {children}
        </section>
      </main>
    </ProgressProvider>
  );
}
