import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { colors } from "../colors";

const themeConfig = {
  palette: {
    primary: colors.red,
    secondary: colors.yellow,
  },
  typography: {

    fontFamily: [
      'Source Sans Pro',
    ]
  }
}

const theme = createTheme(themeConfig);

export function ThemeProvider({ children }) {
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </StyledEngineProvider>
  );
}
