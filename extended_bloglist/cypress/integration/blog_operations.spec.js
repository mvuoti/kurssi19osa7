/* eslint-disable */
const TEST_TITLE = 'This is a test document from cypress'
const TEST_AUTHOR = 'Cypress testing script'
const TEST_URL = 'http://cypress.io'
const TEST_COMMENT = 'This is a test comment from cypress'

describe('Blog submission, likes and commenting', function () {

  it('toggle exposes, another hides', function () {
    cy.visit('http://localhost:3000');

    cy.get('[data-cy="usernameInput"]').type("test_user");
    cy.get('[data-cy="passwordInput"]').type("test_password");
    cy.get('[data-cy="submitButton"]').click();

    cy.get('[data-cy="blogEntryFormToggle"]').click();
    cy.get('[data-cy="blogEntryForm"]').should('be.visible');

    cy.get('[data-cy="blogEntryForm"]').find('[data-cy="titleInput"]').type(TEST_TITLE)
    cy.get('[data-cy="blogEntryForm"]').find('[data-cy="authorInput"]').type(TEST_AUTHOR)
    cy.get('[data-cy="blogEntryForm"]').find('[data-cy="urlInput"]').type(TEST_URL)
    cy.get('[data-cy="blogEntryForm"]').find('[data-cy="saveButton"]').click()

    cy.get('[data-cy="blogListTable"]')
      .find('tbody tr:first th:first')
      .should('have.text', TEST_TITLE)

    cy.get('[data-cy="blogListTable"]')
      .find('tbody tr:first th:first')
      .find('a')
      .click()
    cy.get('body')
      .find('[data-cy="blogDetails"]')
      .should('not.be.empty')

    cy.get('[data-cy="blogDetails"]').should('contain.text', '0 likes')
    cy.get('[data-cy="likeButton"]').click()
    cy.get('[data-cy="blogDetails"]').should('contain.text', '1 likes')

    cy.get('[data-cy="commentEntryForm"]')
      .find('[data-cy="commentTextInput"]')
      .type(TEST_COMMENT)
    cy.get('[data-cy="commentEntryForm"]')
      .find('[data-cy="saveButton"]')
      .click()
    cy.get('[data-cy="commentList"]')
      .should('contain', TEST_COMMENT)
  })
});