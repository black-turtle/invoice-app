import type { NextPage } from 'next'
import Loader from '../../src/components/loader/Loader'
import Navbar from '../../src/components/nav/Navbar'
import useNavigate from '../../src/hooks/useNavigate'
import AuthGuard from '../../src/modules/auth/AuthGuard'
import ClientsTableContainer from '../../src/modules/clients/list/ClientsTableContainer'
import { DynamicAnimationLayout } from '../../src/utils/commonDynamicComponentUtils'

const ClientsListPage: NextPage = () => {
    const { isReady, routerQuery, updateRouterQuery, navigateTo } =
        useNavigate()

    if (isReady) {
        return (
            <AuthGuard>
                <Navbar />
                <DynamicAnimationLayout>
                    <ClientsTableContainer />
                </DynamicAnimationLayout>
            </AuthGuard>
        )
    }
    return <Loader fullScreen />
}

export default ClientsListPage
