import {faker} from "@faker-js/faker";

describe("Update customer", () => {
    it("should be able update a customer", () => {
        cy.visit('http://127.0.0.1:5173/customers')

        cy.get(':nth-child(1) > .td-action > .dlvewX > a > .types__StyledButton-sc-ws60qy-0').click()

        const customer = {
            name: faker.name.fullName(),
            documentNumber: faker.random.numeric(11),
            email: faker.internet.email(),
            phoneNumber: faker.phone.number("119########"),
        }

        cy.get('#name').clear()
        cy.get('#name').type(customer.name)

        cy.get('#email').clear()
        cy.get('#email').type(customer.email)

        cy.get('#gender').clear()
        cy.get('#gender').type('F')

        cy.get('#documentNumber').clear()
        cy.get('#documentNumber').type(customer.documentNumber)

        cy.get('#phoneNumber').clear()
        cy.get('#phoneNumber').type(customer.phoneNumber)

        cy.findByText("Editar").click()

        cy.get(".flash-notification").should('have.text', 'Conta editada com sucesso.')
    })
})