// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

const API_URL = 'http://localhost:3003/api'
const TEST_USER = {
  username: 'test_user',
  name: 'Test User',
  password: 'test_password'
}




beforeEach(() => {
  resetDatabase()
})

const resetDatabase = () => {
  cy.request('POST', `${API_URL}/testing/reset`)
  cy.request(
    'POST',
    `${API_URL}/users`,
    TEST_USER
  )
}
