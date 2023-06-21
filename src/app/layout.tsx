"use client";
import "./globals.css";
import { Public_Sans } from "next/font/google";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme } from "@/theme";
import { Navbar } from "@/components/ui";
import { usePathname } from "next/navigation";

const publicSans = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isAuth = path.includes("auth");

  return (
    <html lang="en">
      <head>
        <title>iStock</title>
      </head>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <body className={publicSans.className}>
          {isAuth ? <>{children}</> : <Navbar>{children}</Navbar>}
        </body>
      </ThemeProvider>
    </html>
  );
}
