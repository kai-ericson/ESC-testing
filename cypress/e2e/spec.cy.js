describe('template spec', () => {
  it('passes', () => {
    cy.viewport(1780, 800)
    cy.visit('http://127.0.0.1:5500/index.html')
    cy.get('a').contains('Play online').click();
  })
  it('passes', () => {
    cy.viewport(1780, 800)
    cy.visit('http://127.0.0.1:5500/index.html')
    cy.get('a').contains('Play online').click();
    cy.get('button').contains('Filter challenges').click(); 
  })
})