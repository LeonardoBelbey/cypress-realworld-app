describe("Smoke - Login @smoke", () => {
  it("should login with a valid user", () => {
    cy.loginAs()
    cy.visit("/")

    cy.url().should("not.include", "/signin")
    cy.contains("Account Balance").should("be.visible")
  })
})