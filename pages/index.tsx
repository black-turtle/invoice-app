import type { NextPage } from 'next'
import Navbar from '../src/components/nav/Navbar'
import AuthGuard from '../src/modules/auth/AuthGuard'
import DashBoardContainer from '../src/modules/dashboard/DashBoardContainer'
import { DynamicAnimationLayout } from '../src/utils/commonDynamicComponentUtils'

const Home: NextPage = () => {
    return (
        <AuthGuard>
            <Navbar />
            <DynamicAnimationLayout>
                <DashBoardContainer />
            </DynamicAnimationLayout>
        </AuthGuard>
    )
}

export default Home
