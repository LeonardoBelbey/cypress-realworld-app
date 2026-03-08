declare global {
  namespace Cypress {
    interface Chainable {
      loginAs(username?: string, password?: string): Chainable<void>
    }
  }
}

Cypress.Commands.add("loginAs", (username, password = "s3cret") => {
  if (username) {
    cy.session([username], () => {
      cy.visit("/signin")

      cy.get('[data-test="signin-username"]').find("input").clear().type(username)
      cy.get('[data-test="signin-password"]').find("input").clear().type(password)
      cy.get('[data-test="signin-submit"]').click()

      cy.url().should("not.include", "/signin")
    })
    return
  }

  cy.database("find", "users").then((user: any) => {
    cy.session([user.username], () => {
      cy.visit("/signin")

      cy.get('[data-test="signin-username"]').find("input").clear().type(user.username)
      cy.get('[data-test="signin-password"]').find("input").clear().type(password)
      cy.get('[data-test="signin-submit"]').click()

      cy.url().should("not.include", "/signin")
    })
  })
})

export {}