import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({});
const { breakpoints } = defaultTheme;

export const lightTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#19A7CE",
    },
    text: {
      primary: "#F0F0F0",
    },
    action: {
      active: "#F0F0F0",
    },
    background: {
      paper: "#212A3E",
      default: "#394867",
    },
    divider: "#394867",
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          height: 114,
          [breakpoints.between("xs", "sm")]: {
            height: 60,
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 60,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 36,
          fontWeight: 500,
          [breakpoints.between("xs", "sm")]: {
            fontSize: 24,
          },
        },
        subtitle2: {
          fontSize: 20,
          fontWeight: 600,
          [breakpoints.between("xs", "sm")]: {
            fontSize: 15,
          },
        },
        body1: {
          fontSize: 19,
          [breakpoints.between("xs", "sm")]: {
            fontSize: 12,
          },
        },
        caption: {
          fontSize: 11,
          fontWeight: 300,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
          borderRadius: "10px",
        },
      },
    },
  },
});
