import { CyCantAccessPageWithoutCompanyDetails } from './utils/company-detail-access-check'
import { CyCantAccessPageWithoutLogin, CyLogin } from './utils/utils'

describe('/dashboard access', () => {
    CyCantAccessPageWithoutLogin('http://localhost:3000')
    CyCantAccessPageWithoutCompanyDetails('http://localhost:3000')
})

describe('/dashboard', () => {
    before(CyLogin)

    it('dashboard has relevant tables', () => {
        cy.get(`[data-test='clients-table']`).should('be.visible')
        cy.get(`[data-test='view-all-clients']`).should('be.visible')
        cy.get(`[data-test='add-client']`).should('be.visible')

        cy.get(`[data-test='invoices-table']`).should('be.visible')
        cy.get(`[data-test='view-all-invoices']`).should('be.visible')
        cy.get(`[data-test='add-invoice']`).should('be.visible')
    })

    it('dashboard has relevant data for fake_user1', () => {
        cy.get(`[data-test*="client-row"]`).should('have.length', 3)
        cy.get(`[data-test='client-actions']`).should('have.length', 3)

        cy.get(
            `[data-test*="client-row"]:first [data-test="client-name"]`,
        ).contains('Alice')
        cy.get(
            `[data-test*="client-row"]:first [data-test="client-companyName"]`,
        ).contains('Wonderland')

        cy.get(
            `[data-test*="client-row"]:nth-child(2) [data-test="client-name"]`,
        ).contains('John')
        cy.get(
            `[data-test*="client-row"]:nth-child(2) [data-test="client-companyName"]`,
        ).contains('Skynet 2')

        cy.get(`[data-test*="invoice-row"]`).should('have.length', 1)
        cy.get(`[data-test='invoice-actions']`).should('have.length', 1)

        cy.get(
            `[data-test*="invoice-row"]:first [data-test="invoice-number"]`,
        ).contains('1234')
        cy.get(
            `[data-test*="invoice-row"]:first [data-test="invoice-company"]`,
        ).contains('Apple')
    })
})
export {}
