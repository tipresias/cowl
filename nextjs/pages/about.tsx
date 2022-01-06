import React from "react";
import styled from "styled-components";

const AboutStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.2rem;
`;

const About = () => (
  <AboutStyled>
    <h2>About Tipresias</h2>
    <p>
      A machine-learning model for predicting AFL match results through
      accessible Data visualizations.
    </p>
    <div>
      Team:
      <ul>
        <li>
          <a href="https://github.com/cfranklin11">Craig Franklin</a>
          (Backend developer)
        </li>
        <li>
          <a href="https://github.com/meligatt">Mel Gattoni</a>
          (Frontend developer)
        </li>
      </ul>
    </div>
  </AboutStyled>
);

export default About;
