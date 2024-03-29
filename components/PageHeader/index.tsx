import React from "react";
import Link from "next/link";
import styled from "styled-components";
import logoImage from "../../images/logo.svg";

const Header = styled.header`
  grid-column: 1 / -1;
  border-bottom: 1px solid ${(props) => props.theme.colors.widgetBorderColor};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  @media (min-width: 425px) {
    grid-column: 2 / -2;
    justify-content: space-between;
  }
`;

const Logo = styled.img`
  height: auto;
  width: 150px;
  filter: ${(props) => props.theme.colors.logoFilter};
  margin: 1rem;
`;

const ListStyled = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  @media (min-width: 425px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ListItem = styled.li`
  display: table-cell;
  text-align: center;
  @media (max-width: 425px) {
    display: ${(props: { displayInMobile: boolean }) =>
      props.displayInMobile ? "block" : "none"};
  }
`;

const TextLink = styled.a`
  line-height: 48px;
  display: inline-block;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.textColor};
  margin: 0 0.5rem;
  @media (min-width: 768px) {
    line-height: 72px;
    padding: 0 16px;
  }
`;

const ToggleThemeButton = styled.button`
  background: ${(props) => props.theme.colors.buttonBackground};
  color: ${(props) => props.theme.colors.buttonColor};
  padding: 0.2rem;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
`;

type Props = {
  links: Array<{ url: string; text: string }>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const PageHeader = ({ links, isDarkMode, toggleDarkMode }: Props) => (
  <Header>
    <Link href="/">
      <Logo src={logoImage.src} alt="Tipresias" width="120" />
    </Link>
    <nav>
      <ListStyled>
        {links.map((link) => (
          <ListItem key={link.url} displayInMobile={false}>
            <TextLink href={link.url}>{link.text}</TextLink>
          </ListItem>
        ))}
        <ListItem displayInMobile>
          <ToggleThemeButton aria-pressed={isDarkMode} onClick={toggleDarkMode}>
            Dark theme:
            <span aria-hidden="true">{isDarkMode ? "On" : "Off"}</span>
          </ToggleThemeButton>
        </ListItem>
      </ListStyled>
    </nav>
  </Header>
);

export default PageHeader;
