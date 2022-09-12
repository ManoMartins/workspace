describe("Delete customer", () => {
    it("should be able delete a customer", () => {
        cy.visit('http://127.0.0.1:5173/customers')

        cy.get(':nth-child(1) > .td-action > .dlvewX > [aria-label="Remover item"]').click()

        cy.findByText("OK").click()

        cy.get(".flash-notification").should('have.text', 'Item removido com sucesso.')
    })
})

export {}