import { CyLoginUser } from '../utils/auth'
import { CyCantAccessPageWithoutCompanyDetails } from '../utils/company-detail-access-check'
import { CyCantAccessPageWithoutLogin } from '../utils/utils'

const PAGE = '/invoices'
const EXISTING_USER_EMAIL = 'fake_user5@officehourtesting.com'
const EXISTING_USER_PASSWORD = '123456'

describe(`${PAGE} access`, () => {
    CyCantAccessPageWithoutLogin(`http://localhost:3000/${PAGE}`)

    CyCantAccessPageWithoutCompanyDetails(`http://localhost:3000/${PAGE}`)
})

describe(`${PAGE} navigation`, () => {
    beforeEach(() => CyLoginUser(EXISTING_USER_EMAIL, EXISTING_USER_PASSWORD))

    it('From dashboard page, can navigate to /invoices page by clicking all invoices button', () => {
        cy.get(`[data-test='view-all-invoices']`).should('be.visible').click()
        cy.location('pathname').should('eq', PAGE)
    })

    it(`From /invoices page, can navigate to /invoices/new page by clicking 'create new invoice' button`, () => {
        cy.get(`[data-test='add-invoice']`).should('be.visible').click()
        cy.location('pathname').should('eq', '/invoices/new')
    })

    it(`From /invoices page, can navigate to /invoices/{id} page by clicking row action (Edit)`, () => {
        cy.visit(`http://localhost:3000/${PAGE}`)

        // click expand actions
        cy.get(`[data-test*="invoice-row"]:first [data-test="invoice-actions"]`)
            .should('be.visible')
            .click()

        // click edit actions
        cy.get(`[data-test*="edit-action"]:first`).should('be.visible').click()
        cy.location('pathname').should('eq', '/invoices/ms1')
    })

    it(`From /invoices page, can navigate to /invoices/{id}/view page by clicking row action (Print)`, () => {
        cy.visit(`http://localhost:3000/${PAGE}`)

        // click expand actions
        cy.get(`[data-test*="invoice-row"]:first [data-test="invoice-actions"]`)
            .should('be.visible')
            .click()

        // click edit actions
        cy.get(`[data-test*="print-action"]:first`).should('be.visible').click()
        cy.location('pathname').should('eq', '/invoices/ms1/view')
    })
})

describe(`${PAGE} page check table data`, () => {
    before(() => {
        CyLoginUser(EXISTING_USER_EMAIL, EXISTING_USER_PASSWORD)
        cy.visit(`http://localhost:3000/${PAGE}`)
    })

    it('Check Title', () => {
        cy.get(`[data-test="table-title"]`).within(() => {
            cy.get(`h4`).contains('Invoices')
        })
    })

    it('Check Header data', () => {
        cy.get(`[data-test="invoice-header"]`).should('be.visible')
        cy.get(`[data-test="projectCode-header"]`).should('be.visible')
        cy.get(`[data-test="companyName-header"]`).should('be.visible')
        cy.get(`[data-test="date-header"]`).should('be.visible')
        cy.get(`[data-test="dueDate-header"]`).should('be.visible')
        cy.get(`[data-test="price-header"]`).should('be.visible')
    })

    it(`Check row data`, async () => {
        cy.get(`[data-test*="invoice-row"]`).should('have.length', 10)
        cy.get(`[data-test='invoice-actions']`).should('have.length', 10)

        // check first row data
        cy.get(`[data-test*="invoice-row"]:first`).within(() => {
            cy.get(`[data-test="invoice-number"]`).contains('1234-ap-23')

            cy.get(`[data-test="invoice-company"]`).contains('Apple')
        })

        // check last row data
        cy.get(`[data-test*="invoice-row"]:last`).within(() => {
            cy.get(`[data-test="invoice-number"]`).contains('1234-ap-17')

            cy.get(`[data-test="invoice-company"]`).contains('Apple')
        })
    })

    it('Check filters', () => {
        cy.get(`[data-test="company-name-filter"]`).should('be.visible')
    })

    it('Check Pagination data', () => {
        cy.get(`[data-test="table-pagination"]`).should('be.visible')
    })
})

describe(`${PAGE} page check table actions`, () => {
    before(() => {
        CyLoginUser(EXISTING_USER_EMAIL, EXISTING_USER_PASSWORD)
        cy.visit(`http://localhost:3000/${PAGE}`)
    })

    it('Check Sort working', () => {
        // test ascending sort
        cy.get(`[data-test="companyName-header"]`).click()
        cy.location().should((loc) => {
            expect(loc.search).to.contain('sortBy=companyName')
            expect(loc.search).to.contain('sort=asc')
        })

        cy.get(`[data-test*="invoice-row"]:first`).within(() => {
            cy.get(`[data-test="invoice-company"]`).contains('Microsoft')
        })
    })

    it('Filter working', () => {
        cy.get(`[data-test="company-name-filter"]`).within(() => {
            cy.get(`input`).type('Apple')
            cy.get(`[role="option"]`).click()
        })

        // check total record from pagination component
        cy.get(`.MuiTablePagination-displayedRows`).contains('1–10 of 23')
    })

    it('Pagination working', () => {
        cy.get(`.MuiTablePagination-displayedRows`).contains('1–10 of 23')

        cy.get(`[data-test="table-pagination"]`).within(() => {
            cy.get(`[data-testid="KeyboardArrowRightIcon"]`).click()
        })
        cy.get(`.MuiTablePagination-displayedRows`).contains('11–20 of 23')

        // check query
        cy.location().should((loc) => {
            expect(loc.search).to.contain('offset=10')
        })
    })
})
export {}
