import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import Image from 'next/image'

import isotype from '../../images/isotype.svg';

const Footer = styled.footer`
  grid-column: 1 / -1;
  text-align: center;
  font-size: 1rem;
  color: ${props => props.theme.colors.textColor};
  a {
    color: ${props => props.theme.colors.textColor};
  }
`;

const Isotype = styled.div`
  img {
    margin: 0 5px;
    filter: ${props => props.theme.colors.logoFilter};
  }
`;

const FooterList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    margin: 0 1rem 0 1rem;
  }
  @media (min-width: 425px) {
    flex-direction: row;
    align-items: center;
  }
`;


const PageFooter = () => (
  <Footer>
    <FooterList>
      <li>
        <a href="https://github.com/tipresias">
          <Isotype><Image src={isotype} alt="Tipresias" height={18} width={9} /></Isotype>
          <span>Tipresias</span>
        </a>
      </li>
      <li>
        <a href="https://gist.github.com/meligatt/72b359279b5da1eb6d75be9a2ae403b0">credits</a>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/glossary">Glossary</Link>
      </li>
    </FooterList>

  </Footer>
);

export default PageFooter;
