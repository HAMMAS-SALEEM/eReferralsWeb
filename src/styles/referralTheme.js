import { createTheme } from "@mui/material/styles";
import allButtonVariants from "../styles/buttons";
import typography from "./typography";

const theme = createTheme({
  typography,
  components: {
    MuiButton: {
      variants: allButtonVariants,
    },
  },
});

export default theme;
