import { faker } from '@faker-js/faker';

describe('Create customer', () => {
  it('should be able create', () => {
    cy.visit('http://127.0.0.1:5173/customers')

    cy.findByText("+ Criar cliente").click()

    const customer = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      documentNumber: faker.random.numeric(11),
      phoneNumber: faker.phone.number("119########"),
    }

    cy.get('#name').type(customer.name)
    cy.get('#email').type(customer.email)
    cy.get('#gender').type('M')
    cy.get('#documentNumber').type(customer.documentNumber)
    cy.get('#password').type(customer.password)
    cy.get('#confirmPassword').type(customer.password)
    cy.get('#phoneNumber').type(customer.phoneNumber)

    cy.findByText("Cadastrar").click()

    cy.location('pathname').should('eq', '/customers')
  })
})