import type { NextPage } from 'next'
import Navbar from '../../src/components/nav/Navbar'
import useNavigate from '../../src/hooks/useNavigate'
import AuthGuard from '../../src/modules/auth/AuthGuard'
import NewInvoiceFormContainer from '../../src/modules/forms/invoices/NewInvoiceFormContainer'
import { DynamicAnimationLayout } from '../../src/utils/commonDynamicComponentUtils'

const NewInvoicesPage: NextPage = () => {
    const { routerQuery } = useNavigate()
    const clientId = routerQuery.clientId as string
    return (
        <AuthGuard>
            <Navbar />
            <DynamicAnimationLayout>
                <NewInvoiceFormContainer clientId={clientId} />
            </DynamicAnimationLayout>
        </AuthGuard>
    )
}

export default NewInvoicesPage
