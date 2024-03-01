describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', {
      username: 'bruno',
      password: '12345',
      name: 'bruno misto',
    });
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('h2').should('contain', 'Login');
    cy.contains('username');
    cy.contains('password');
    cy.get('button').should('contain', 'Login');
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username')
        .type('bruno')

      cy.get('#password')
        .type('12345')

      cy.get('#login').click()

      cy.get('h2').should('contain', 'blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username')
        .as('usernameInput')
        .type('bruno')

      cy.get('#password')
        .as('passwordInput')
        .type('wrong')

      cy.get('#login').click()

      cy.get('@usernameInput').should('have.value', '')
      cy.get('@passwordInput').should('have.value', '')

      cy.contains('invalid username/password')
        .should('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
  })
})