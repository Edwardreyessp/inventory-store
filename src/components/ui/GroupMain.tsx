"use client";
import "./globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme } from "@/theme";
import { Navbar } from "@/components/ui";
import { usePathname } from "next/navigation";
import { NextPage } from "next";

interface MainPageProps {
  children: React.ReactNode;
}

export const GroupMain: NextPage<MainPageProps> = ({ children }) => {
  const path = usePathname();
  const isAuth = path.includes("auth");

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <>{isAuth ? <>{children}</> : <Navbar>{children}</Navbar>}</>
    </ThemeProvider>
  );
};
