describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('h2').should('contain', 'Login');
    cy.contains('username');
    cy.contains('password');
    cy.get('button').should('contain', 'Login');
  })
})