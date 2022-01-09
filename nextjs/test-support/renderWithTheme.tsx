import React from "react";
import { shallow } from "enzyme";
import { ThemeProvider } from "styled-components";

function renderWithTheme(
  child: JSX.Element,
  theme: any,
  render: any = shallow
) {
  return render(child, {
    wrappingComponent: ({ children }: { children: JSX.Element }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
  });
}
export default renderWithTheme;
