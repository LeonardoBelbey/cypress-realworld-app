import { paymentData } from "../../utils/testData"

describe("Transactions - send payment @regression", () => {
  it("should send payment and validate it in the feed", () => {
    const payment = paymentData()

    cy.loginAs()
    cy.visit("/")

    cy.intercept("POST", "**/transactions").as("createTransaction")

    cy.get('[data-test="nav-top-new-transaction"]').click()

    cy.contains("Kristian Bradtke").click()

    cy.get('[data-test="transaction-create-amount-input"]')
      .find("input")
      .clear()
      .type(payment.amount)

    cy.get('[data-test="transaction-create-description-input"]')
      .find("input")
      .type(payment.note)

    cy.get('[data-test="transaction-create-submit-payment"]')
      .should("be.enabled")
      .click()

    cy.wait("@createTransaction")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201])

    cy.contains(payment.note).should("be.visible")
    cy.contains(payment.amount).should("be.visible")
  })
})