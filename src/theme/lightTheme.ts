import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#212B36",
    },
    secondary: {
      main: "#00AB55",
    },
    text: {
      primary: "#212B36",
      secondary: "#005249",
    },
    // action: {
    //   active: "#212B36",
    // },
    background: {
      paper: "#F9FAFB",
      default: "#F9FAFB",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 32,
          fontWeight: 600,
          fontFamily: "inherit",
        },
        h2: {
          fontSize: 24,
          fontWeight: 600,
          fontFamily: "inherit",
        },
        h3: {
          fontSize: 20,
          fontWeight: 700,
          fontFamily: "inherit",
        },
        body1: {
          fontSize: 14,
          fontWeight: 400,
          fontFamily: "inherit",
        },
        body2: {
          fontSize: 20,
          fontWeight: 500,
          fontFamily: "inherit",
        },
        overline: {
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "inherit",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          minWidth: 352,
        },
      },
    },
  },
});
