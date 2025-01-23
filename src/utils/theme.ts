import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});
