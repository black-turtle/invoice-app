describe('/login', () => {
    const EXISTING_USER_EMAIL = 'fake_user1@officehourtesting.com'
    const EXISTING_USER_PASSWORD = '123456'

    it('redirect to login when no cookies found', () => {
        cy.clearCookies()
        cy.visit('http://localhost:3000')
        cy.location('pathname').should('eq', '/login')
    })

    it('sees error on email field when clicking login with empty form', () => {
        cy.clearCookies()
        cy.visit('http://localhost:3000/login')

        cy.get('[data-test="submit-login"]').click()
        cy.get('[data-test="email-error"]').should('be.visible')
        cy.get('[data-test="password-error"]').should('be.visible')

        cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`)
        cy.get('[data-test="submit-login"]').click()

        cy.get('[data-test="email-error"]').should('have.length', 0)
        cy.get('[data-test="password-error"]').should('be.visible')
    })

    it('fields can trigger submit when pressing enter', () => {
        cy.clearCookies()
        cy.visit('http://localhost:3000/login')

        cy.get('[data-test="email"]').should('be.visible')
        cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}{enter}`)
        cy.get('[data-test="email-error"]').should('have.length', 0)
        cy.get('[data-test="password-error"]').should('be.visible')
    })

    it('logs in succesfully', () => {
        cy.clearCookies()
        cy.visit('http://localhost:3000/login')

        cy.get('[data-test="email"]').should('be.visible')
        cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`)
        cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`)
        cy.get('[data-test="submit-login"]').click()

        cy.location('pathname').should('eq', '/')
    })

    it('cannot access login when user is logged in', () => {
        cy.clearCookies()
        cy.visit('http://localhost:3000')

        cy.get('[data-test="email"]').should('be.visible')
        cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`)
        cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`)
        cy.get('[data-test="submit-login"]').click()

        cy.location('pathname').should('eq', '/')
    })
})
export {}
