import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { QueryWrapper } from "@/components/auth/QueryWrapper";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Praktykomat Dzienniczek",
  description: "Elektroniczny dzienniczek dla praktykantów",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" data-theme="light">
      <body className={inter.className}>
        <QueryWrapper>
          <Header />
          <main className="min-h-[calc(100vh-300px)] bg-base-200">
            {children}
          </main>
          <Footer />
        </QueryWrapper>
      </body>
    </html>
  );
}
