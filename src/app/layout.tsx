"use client";
import "./globals.css";
import { Public_Sans } from "next/font/google";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme } from "@/theme";

const publicSans = Public_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "iStock",
  description: "Proyecto final de Ingeniería de Software | ESCOM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <body className={publicSans.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
