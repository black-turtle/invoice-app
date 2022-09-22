import type { NextPage } from 'next'
import Navbar from '../src/components/nav/Navbar'
import AuthGuard from '../src/modules/auth/AuthGuard'
import CompanyDetailFormContainer from '../src/modules/forms/company-detail/CompanyDetailFormContainer'
import { DynamicAnimationLayout } from '../src/utils/commonDynamicComponentUtils'

const CompanyDetails: NextPage = () => {
    return (
        <AuthGuard>
            <Navbar />
            <DynamicAnimationLayout>
                <CompanyDetailFormContainer />
            </DynamicAnimationLayout>
        </AuthGuard>
    )
}

export default CompanyDetails
