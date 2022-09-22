import type { NextPage } from 'next'
import Navbar from '../../src/components/nav/Navbar'
import AuthGuard from '../../src/modules/auth/AuthGuard'
import NewClientsFormContainer from '../../src/modules/forms/clients/NewClientsFormContainer'
import { DynamicAnimationLayout } from '../../src/utils/commonDynamicComponentUtils'

const NewClientsPage: NextPage = () => {
    return (
        <AuthGuard>
            <Navbar />
            <DynamicAnimationLayout>
                <NewClientsFormContainer />
            </DynamicAnimationLayout>
        </AuthGuard>
    )
}

export default NewClientsPage
