import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Form Validation Next",
  description: "This is a Next.js application with form validation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(inter.className, "dark")}
      style={{ colorScheme: "dark" }}>
      <body suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          enableSystem>
          <main className="flex justify-center items-center min-h-screen">{children}</main>
          <ThemeToggle className="absolute top-6 right-6" />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
