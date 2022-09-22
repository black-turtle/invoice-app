const EXISTING_USER_EMAIL = 'fake_user1@officehourtesting.com'
const EXISTING_USER_PASSWORD = '123456'

export const CyLogin = () => {
    cy.clearCookies()
    cy.visit('http://localhost:3000/login')

    cy.get('[data-test="email"]').should('be.visible')
    cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`)
    cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`)
    cy.get('[data-test="submit-login"]').click()

    cy.location('pathname').should('eq', '/')
}

export const CyCantAccessPageWithoutLogin = (url: string) => {
    it('cannot access if not logged in', () => {
        cy.clearCookies()
        cy.visit(url)

        cy.location('pathname').should('eq', '/login')
    })
}
