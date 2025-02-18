import { AppSidebar } from "@/_components/AppSidebar";
import Header from "@/_components/Header";
import { SidebarProvider } from "@/_components/ui/sidebar";
import AuthProvider from "@/_providers/auth";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SidebarProvider>
            <AppSidebar />
            <main
              className={
                "flex h-screen w-full flex-1 flex-col items-center justify-between bg-[#F0F0F0] sm:h-screen"
              }
            >
              <Header />
              <div className="flex h-screen w-full flex-1 items-center justify-center">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
