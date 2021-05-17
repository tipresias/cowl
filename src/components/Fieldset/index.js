// @flow
import React from 'react';
import styled from 'styled-components/macro';
import type { Node } from 'react';

const FieldsetStyled = styled.fieldset`
display: flex;
flex-wrap: wrap;
`;

const LegendStyled = styled.legend`
  font-weight: bold;
`;

type Props = {
  legend: string,
  children: Node;
}
const Fieldset = ({
  legend,
  children,
}: Props): Node => (
  <FieldsetStyled>
    <LegendStyled>{legend}</LegendStyled>
    {children}
  </FieldsetStyled>
);

export default Fieldset;
