import { CyLoginUser, CyRegisterUser } from './auth'

const WITHOUT_COMPANY_DETAILS_USER_NAME = `WITHOUT COMPANY DETAILS USER`
const WITHOUT_COMPANY_DETAILS_PASSWORD = `123456`
const WITHOUT_COMPANY_DETAILS_EMAIL = `test-user-no-company-details@test.com`

export const CyCantAccessPageWithoutCompanyDetails = (url: string) => {
    it('cannot access Without company details', () => {
        CyRegisterUser(
            WITHOUT_COMPANY_DETAILS_USER_NAME,
            WITHOUT_COMPANY_DETAILS_EMAIL,
            WITHOUT_COMPANY_DETAILS_PASSWORD,
        )
        CyLoginUser(
            WITHOUT_COMPANY_DETAILS_EMAIL,
            WITHOUT_COMPANY_DETAILS_PASSWORD,
        )

        cy.visit(url)

        cy.location('pathname').should('eq', '/company-details')
    })
}
