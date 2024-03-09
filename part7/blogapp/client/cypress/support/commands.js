Cypress.Commands.add("resetDB", () => {
  cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
});

Cypress.Commands.add("register", (user) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password,
  }).then((response) => {
    localStorage.setItem("loggedUser", JSON.stringify(response.body));
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", (blog) =>
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("loggedUser")).token}`,
    },
    body: blog,
  }),
);
