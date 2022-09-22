export const CyRegisterUser = (
    name: string,
    email: string,
    password: string,
) => {
    cy.clearCookies()
    cy.visit('http://localhost:3000/signup')
    cy.get('[data-test="name"]').type(`${name}`)
    cy.get('[data-test="email"]').type(`${email}`)
    cy.get('[data-test="password"]').type(`${password}`)
    cy.get('[data-test="confirm-password"]').type(`${password}`)
    cy.get('[data-test="submit-sign-up"]').click()
}

export const CyLoginUser = (email: string, password: string) => {
    cy.clearCookies()
    cy.visit('http://localhost:3000/login')

    cy.get('[data-test="email"]').should('be.visible')
    cy.get('[data-test="email"]').type(`${email}`)
    cy.get('[data-test="password"]').type(`${password}`)
    cy.get('[data-test="submit-login"]').click()
}
