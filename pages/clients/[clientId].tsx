import type { NextPage } from 'next'
import Loader from '../../src/components/loader/Loader'
import Navbar from '../../src/components/nav/Navbar'
import useNavigate from '../../src/hooks/useNavigate'
import AuthGuard from '../../src/modules/auth/AuthGuard'
import EditClientsFormContainer from '../../src/modules/forms/clients/EditClientsFormContainer'
import { DynamicAnimationLayout } from '../../src/utils/commonDynamicComponentUtils'

const ClientsEditPage: NextPage = () => {
    const { router } = useNavigate()
    const { clientId } = router.query

    if (clientId) {
        return (
            <AuthGuard>
                <Navbar />
                <DynamicAnimationLayout>
                    <EditClientsFormContainer id={clientId as string} />
                </DynamicAnimationLayout>
            </AuthGuard>
        )
    }
    return <Loader />
}

export default ClientsEditPage
