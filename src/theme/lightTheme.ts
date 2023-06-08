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
    },
    // action: {
    //   active: "#212B36",
    // },
    background: {
      paper: "#EDF1FF",
      default: "#FFF",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 32,
          fontWeight: 600,
        },
        h2: {
          fontSize: 24,
          fontWeight: 600,
        },
        body2: {
          fontSize: 20,
          fontWeight: 500,
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
