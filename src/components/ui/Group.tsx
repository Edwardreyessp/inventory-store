"use client";
import { lightTheme } from "@/theme";
import {
  Typography,
  Grid,
  Box,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import Image from "next/image";

export const Group = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          position="fixed"
          m="40px 0 0 30px"
        >
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo"
            width={48}
            height={48}
          />
          <Typography variant="body2">iStock</Typography>
        </Box>
        <Grid container alignItems="center" height="100vh">
          <Grid
            item
            xs={6}
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ background: "#EDF1FF" }}
            gap={2}
          >
            <Typography variant="h1" component="h1">
              ¡Bienvenido a iStock!
            </Typography>
            <Image
              src="/assets/images/login.png"
              alt="Login"
              width={720}
              height={540}
            />
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {children}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
