import { lightTheme } from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

const HomePage = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <h1>HomePage</h1>
    </ThemeProvider>
  );
};

export default HomePage;
