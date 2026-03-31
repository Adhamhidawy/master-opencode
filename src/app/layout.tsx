import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LayoutShell } from "@/components/layout/layout-shell";
import { SearchOverlay } from "@/components/interactive/search-overlay";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Master OpenCode",
  description:
    "The interactive, hands-on guide to mastering OpenCode — the open-source AI coding agent with 133K+ GitHub stars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="dark">
        <body className={inter.className}>
          <ThemeProvider>
            <SearchOverlay />
            <LayoutShell>{children}</LayoutShell>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
