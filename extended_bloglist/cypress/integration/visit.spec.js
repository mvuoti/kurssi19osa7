describe('Visiting the application main page', function () {
  it('Login with empty credentials fails', function () {
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click();
    cy.contains('failed');
  });
  
  it('Login with faulty credentials fails', function () {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="usernameInput"]').type('nonsense');
    cy.get('[data-cy="passwordInput"]').type('nonsense');
    cy.get('[data-cy="submitButton"]').click();
    cy.contains('failed');
  });
  
  it('Login with correct credentials succeeds', function () {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="usernameInput"]').type('test_user');
    cy.get('[data-cy="passwordInput"]').type('test_password');
    cy.get('[data-cy="submitButton"]').click();
    cy.contains('Logged in as');
  });

});