import { bankAccountData } from "../../utils/testData"

describe("Bank Account - lifecycle @regression", () => {
  it("should create a bank account and then delete it", () => {
    const account = bankAccountData()

    cy.loginAs()
    cy.visit("/bankaccounts/new")

    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "CreateBankAccount") {
        req.alias = "createBankAccount"
      }

      if (req.body.operationName === "DeleteBankAccount") {
        req.alias = "deleteBankAccount"
      }
    })

    cy.get('[data-test="bankaccount-bankName-input"]').find("input").type(account.bankName)
    cy.get('[data-test="bankaccount-routingNumber-input"]').find("input").type(account.routingNumber)
    cy.get('[data-test="bankaccount-accountNumber-input"]').find("input").type(account.accountNumber)

    cy.get('[data-test="bankaccount-submit"]').should("be.enabled").click()

    cy.wait("@createBankAccount")
      .its("response.statusCode")
      .should("eq", 200)

    cy.visit("/bankaccounts")

    cy.contains(account.bankName).should("be.visible")

    cy.contains(account.bankName)
      .parents("li")
      .within(() => {
        cy.contains("Delete").click()
      })

    cy.wait("@deleteBankAccount")
      .its("response.statusCode")
      .should("eq", 200)

    cy.reload()

    cy.contains(account.bankName).should("not.exist")
  })
})