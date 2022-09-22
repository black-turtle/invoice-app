import type { NextPage } from 'next'
import Loader from '../../../src/components/loader/Loader'
import Navbar from '../../../src/components/nav/Navbar'
import useNavigate from '../../../src/hooks/useNavigate'
import AuthGuard from '../../../src/modules/auth/AuthGuard'
import EditInvoiceFormContainer from '../../../src/modules/forms/invoices/EditInvoiceFormContainer'
import { DynamicAnimationLayout } from '../../../src/utils/commonDynamicComponentUtils'

const InvoiceEditPage: NextPage = () => {
    const { router } = useNavigate()
    const { invoiceId } = router.query
    if (invoiceId) {
        return (
            <AuthGuard>
                <Navbar />
                <DynamicAnimationLayout>
                    <EditInvoiceFormContainer id={invoiceId as string} />
                </DynamicAnimationLayout>
            </AuthGuard>
        )
    }

    return <Loader fullScreen />
}

export default InvoiceEditPage
