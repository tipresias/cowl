import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import darkTheme from "../../themes/dark";
import lightTheme from "../../themes/light";
import PageHeader from "../../components/PageHeader";
import PageFooter from "../../components/PageFooter";
import { AppContainerStyled, MainStyled } from "./style";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => localStorage.setItem("isDarkMode", String(isDarkMode)));

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppContainerStyled>
        <PageHeader
          links={[{ url: "/about", text: "About" }]}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <MainStyled>{children}</MainStyled>
        <PageFooter />
      </AppContainerStyled>
    </ThemeProvider>
  );
};

export default Layout;
