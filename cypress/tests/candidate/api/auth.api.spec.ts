describe("API - Authentication", () => {

  it("should authenticate successfully", () => {

    cy.request("POST", "http://localhost:3001/login", {
      username: "Heath93",
      password: "s3cret"
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("user")

    })

  })

})