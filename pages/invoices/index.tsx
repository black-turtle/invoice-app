import type { NextPage } from 'next'
import Navbar from '../../src/components/nav/Navbar'
import AuthGuard from '../../src/modules/auth/AuthGuard'
import InvoicesTableContainer from '../../src/modules/invoices/list/InvoicesTableContainer'
import { DynamicAnimationLayout } from '../../src/utils/commonDynamicComponentUtils'

const InvoiceListPage: NextPage = () => {
    return (
        <AuthGuard>
            <Navbar />
            <DynamicAnimationLayout>
                <InvoicesTableContainer />
            </DynamicAnimationLayout>
        </AuthGuard>
    )
}

export default InvoiceListPage
