import React from "react";
import styled from "styled-components";

const FieldsetStyled = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
`;

const LegendStyled = styled.legend`
  font-weight: bold;
`;

type Props = {
  legend: string;
  children: React.ReactNode;
};
const Fieldset = ({ legend, children }: Props) => (
  <FieldsetStyled>
    <LegendStyled>{legend}</LegendStyled>
    {children}
  </FieldsetStyled>
);

export default Fieldset;
