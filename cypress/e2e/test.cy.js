describe("test my site", ()=>{
    it("Visit site and check header h1", ()=>{
        cy.visit("http://127.0.0.1:5501/")
        cy.get("h1").should("have.text", "Hacker Escape Rooms")
    })

})