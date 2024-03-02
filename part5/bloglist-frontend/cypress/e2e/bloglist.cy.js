// Reminder: use function() instead of ()=> if willing to use 'this'

describe('Blog app', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.register({
      username: 'bruno',
      password: '12345',
      name: 'bruno misto',
    });
    cy.visit('');
  });

  it('Login form is shown', () => {
    cy.get('h2').should('contain', 'Login');
    cy.contains('username');
    cy.contains('password');
    cy.get('button').should('contain', 'Login');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username')
        .type('bruno');

      cy.get('#password')
        .type('12345');

      cy.get('#login').click();

      cy.get('h2').should('contain', 'blogs');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username')
        .as('usernameInput')
        .type('bruno');

      cy.get('#password')
        .as('passwordInput')
        .type('wrong');

      cy.get('#login').click();

      cy.get('@usernameInput').should('have.value', '');
      cy.get('@passwordInput').should('have.value', '');

      cy.contains('invalid username/password')
        .should('have.css', 'border-color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({
        username: 'bruno',
        password: '12345',
      });
    });

    it('A blog can be created', () => {
      cy.contains('new blog')
        .click();

      const blog = {
        title: 'a cool blog',
        author: 'someone',
        url: 'http://blog.com',
      };

      cy.get('#title')
        .type(blog.title);

      cy.get('#author')
        .type(blog.author);

      cy.get('#url')
        .type(blog.url);

      cy.contains('add')
        .click();

      cy.request(`${Cypress.env('BACKEND')}/blogs`)
        .its('body.length')
        .should('eq', 1);
    });

    describe('when user creates 1 blog', () => {
      beforeEach(() => {
        const blog = {
          title: 'a cool blog',
          author: 'someone',
          url: 'http://blog.com',
        };

        cy.request({
          url: `${Cypress.env('BACKEND')}/blogs`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`,
          },
          body: blog,
        })
          .then(() => {
            cy.visit('');
          });
      });

      it('a blog can be liked', () => {
        cy.contains('view').click();
        cy.get('.like-button').click();
        cy.contains('likes 1');
      });

      it('a blog can be deleted', () => {
        cy.contains('view').click();
        cy.contains('delete').click();
        cy.get('html').should('not.contain', 'a cool blog someone');
      });

      it('only blog creator can see delete button', () => {
        cy.contains('view').click();
        cy.contains('delete');
        const user = {
          username: 'newguy',
          password: '12345',
          name: 'new guy',
        };

        cy.register(user);
        cy.login({
          username: user.username,
          password: user.password,
        });
        cy.contains('view').click();
        cy.get('html').should('not.contain', 'delete');
      });
    });
  });
});
