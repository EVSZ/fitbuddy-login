/// <reference types="cypress" />
describe('Register and Sign in User', () => {
    it('Navigates to the register page and displays passwords do not match', () => {
        cy.visit('/')

        cy.get('[data-testid=formSwitchBtn]').click()

        cy.contains('Registration')

        cy.get('[data-testid=username')
            .type('evsz')
            .should('have.value', 'evsz')

        cy.get('[data-testid=email')
            .type('mateusz@gmail.com')

        cy.get('[data-testid=passCheck')
            .type('FontysCobbenhagen')

        cy.get('[data-testid=password')
            .type('FontysCobbenhagenHaha')

        cy.contains('password does not match')
    })

    it('Signs up a new user', () => {
  
        cy.get('[data-testid=password')
            .clear()
            .type('FontysCobbenhagen')

        cy.get('[data-testid=formSubmitBtn]').click()
    })
})