/* eslint-disable */
describe('Blog entry form toggle works', function () {
  it('toggle exposes, another hides', function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="usernameInput"]').type("seppo");
    cy.get('[data-cy="passwordInput"]').type("figaro");
    cy.get('[data-cy="submitButton"]').click();
  
    cy.get('[data-cy="blogEntryFormToggle"]').click();
    cy.get('[data-cy="blogEntryForm"]').should('be.visible');
    
    const TEST_TITLE = 'This is a test document from cypresss'
    const TEST_AUTHOR = 'Cypress testing script'
    const TEST_URL  = 'http://cypress.io'

    cy.get('[data-cy="blogEntryForm"]').find('[data-cy="titleInput"]').type(TEST_TITLE)
    cy.get('[data-cy="blogEntryForm"]').find('[data-cy="authorInput"]').type(TEST_AUTHOR)
    cy.get('[data-cy="blogEntryForm"]').find('[data-cy="urlInput"]').type(TEST_URL)
    cy.get('[data-cy="blogEntryForm"]').find('[data-cy="saveButton"]').click()

    cy.get('[data-cy="blogListTable"]')
    .find('tbody tr:first th:first')
    .should('have.text', TEST_TITLE)
  });
});