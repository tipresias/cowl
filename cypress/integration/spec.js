describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/', { headers: { Connection: 'Keep-Alive' } });
  });

  describe('When page loads', () => {
    it('loads all 3 widgets', () => {
      cy.get('h3[class*=WidgetHeading]').should('have.length', 3);
    });

    it('checks all models by defaults', () => {
      cy.get('input[type=checkbox]').should('be.checked');
    });

    it('loads main chart', () => {
      cy.get('.WidgetHeading__selected-year').should('be.visible');
      cy.get('.recharts-responsive-container').should('be.visible');
    });

    it('theme is light by default', () => {
      cy.get('button[class*=ToggleThemeButton]').contains('Off').should('be.visible');
    });
  });

  describe('Theme switcher', () => {
    it('toggles to dark theme', () => {
      cy.get('button[class*=ToggleThemeButton]').click();
      cy.get('button[class*=ToggleThemeButton]').contains('On').should('be.visible');
      cy.get('[class*=AppContainerStyled]').should('have.css', 'background-color', 'rgb(21, 32, 43)');
    });
  });

  describe('Main chart widget', () => {
    it('refreshes when year is selected', () => {
      const thisYear = new Date().getFullYear()
      const lastYear = String(thisYear - 1)
      cy.get('select').select(lastYear).should('have.value', lastYear);
      cy.get('.WidgetHeading__selected-year').contains(`year: ${lastYear}`).should('be.visible');
      cy.get('.recharts-responsive-container').should('be.visible');
    });

    it('refreshes when models are unchecked', () => {
      cy.get('[type=checkbox]').uncheck();
      cy.get('.recharts-responsive-container').should('be.visible');
      cy.get('.recharts-default-legend').should('not.exist');
    });
  });
});
