import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import darkTheme from '../../themes/dark';
import lightTheme from '../../themes/light';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';

// mobile first app container
export const AppContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 5px;
  grid-auto-flow: column;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textColor};
  @media (min-width: 768px) {
    grid-template-columns: 40px auto 40px;
    grid-template-rows: 80px auto 80px;
    grid-gap: 0.5rem;
  }
`;

export const MainStyled = styled.main`
  grid-column: 1 / -1;
  @media (min-width: 768px) {
    grid-column: 2 / -2;
  }
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => setIsDarkMode(localStorage.getItem('isDarkMode') === 'true'));

  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem('isDarkMode', String(newIsDarkMode));
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppContainerStyled>
        <PageHeader
          links={[{ url: '/about', text: 'About' }]}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <MainStyled>
          {children}
        </MainStyled>
        <PageFooter />
      </AppContainerStyled>
    </ThemeProvider>
  );
};

export default Layout;
