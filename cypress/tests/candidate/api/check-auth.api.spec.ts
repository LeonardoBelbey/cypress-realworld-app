describe("API - Authenticated user", () => {
  it("should return authenticated user data", () => {
    cy.request("POST", "http://localhost:3001/login", {
      username: "Heath93",
      password: "s3cret"
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200)

      cy.request("GET", "http://localhost:3001/checkAuth").then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })
})