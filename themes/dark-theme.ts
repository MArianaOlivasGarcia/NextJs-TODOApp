import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#2B2E42',
    },
  },
  components: {
      MuiAppBar: {
        defaultProps: {},
        styleOverrides: {
          root: {
            backgroundColor: '#2F3246'
          }
        }
      }
  }
});