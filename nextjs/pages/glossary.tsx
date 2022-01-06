import React, { Fragment } from "react";
import styled from "styled-components";

export const GlossaryStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.2rem;
`;

export const DescriptionStyled = styled.dd`
  margin-bottom: 2rem;
`;

const ALL_TERMS = [
  {
    id: 1,
    term: "Tip Point",
    description:
      "The single point received from correctly predicting the result of an AFL match.",
  },
  {
    id: 2,
    term: "Predicted Margin",
    description:
      "The number of points by which a given team is predicted to win the match. This can be negative, which means it's the number of points by which a team is expected to lose.",
  },
  {
    id: 3,
    term: "Predicted Winner",
    description: "The team that is predicted to win a given match.",
  },
  {
    id: 4,
    term: "Cumulative tip points",
    description: "The sum of all tip points earned for the season so far.",
  },
];

const Glossary = () => (
  <GlossaryStyled>
    <h2>Terms used in Tipresias:</h2>
    <dl>
      {ALL_TERMS.map((term) => (
        <Fragment key={term.id}>
          <dt>{term.term}</dt>
          <DescriptionStyled>{term.description}</DescriptionStyled>
        </Fragment>
      ))}
    </dl>
  </GlossaryStyled>
);

export default Glossary;
