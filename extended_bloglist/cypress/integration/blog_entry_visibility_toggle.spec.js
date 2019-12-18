describe('Blog entry form toggle works', function () {
  it('toggle exposes, another hides', function () {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="usernameInput"]').type("seppo");
    cy.get('[data-cy="passwordInput"]').type("figaro");
    cy.get('[data-cy="submitButton"]').click();
  
    cy.get('[data-cy="blogEntryForm"]').should('not.be.visible');

    cy.get('[data-cy="blogEntryFormToggle"]').click();
    cy.get('[data-cy="blogEntryForm"]').should('be.visible');
    
    cy.get('[data-cy="blogEntryFormToggle"]').click();
    cy.get('[data-cy="blogEntryForm"]').should('be.not.visible');
  });
});