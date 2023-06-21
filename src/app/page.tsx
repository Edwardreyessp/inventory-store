"use client";
import "./globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme } from "@/theme";
import { Navbar } from "@/components/ui";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isAuth = path.includes("auth");

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <>{isAuth ? <>{children}</> : <Navbar>{children}</Navbar>}</>
    </ThemeProvider>
  );
}
