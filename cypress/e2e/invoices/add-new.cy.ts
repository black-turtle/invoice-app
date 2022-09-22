import { CyLoginUser } from '../utils/auth'
import { CyCantAccessPageWithoutCompanyDetails } from '../utils/company-detail-access-check'
import { CyCantAccessPageWithoutLogin } from '../utils/utils'

const PAGE = '/invoices/new'
const EXISTING_USER_EMAIL = 'fake_user5@officehourtesting.com'
const EXISTING_USER_PASSWORD = '123456'

describe(`${PAGE} access`, () => {
    CyCantAccessPageWithoutLogin(`http://localhost:3000/${PAGE}`)

    CyCantAccessPageWithoutCompanyDetails(`http://localhost:3000/${PAGE}`)
})

describe(`${PAGE} navigation`, () => {
    beforeEach(() => CyLoginUser(EXISTING_USER_EMAIL, EXISTING_USER_PASSWORD))

    it('can navigate to /invoices page by clicking add button on dashboard', () => {
        cy.get(`[data-test='add-invoice']`).should('be.visible').click()
        cy.location('pathname').should('eq', PAGE)
    })
})
export {}
