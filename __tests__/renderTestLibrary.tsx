import { configure, render } from "@testing-library/react";
import { Theme, ThemeProvider } from "@emotion/react";

// https://testing-library.com/docs/nightwatch-testing-library/intro/#configure
export const setCustomQuery = (attributeName: string) =>
  configure({
    testIdAttribute: attributeName,
  });

export const renderWithTheme = (element: React.ReactNode, theme: Theme) => {
  render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);
};
