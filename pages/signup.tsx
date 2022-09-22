import { GetServerSideProps, NextPage } from 'next'
import { RegisterFormContainer } from '../src/modules/forms/register/RegisterContainer'
import { DynamicAnimationLayout } from '../src/utils/commonDynamicComponentUtils'
import { serverSideNoAuthGuard } from '../src/utils/serverSideAuthUtils'

const Register: NextPage = () => {
    return (
        <DynamicAnimationLayout>
            <RegisterFormContainer />
        </DynamicAnimationLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return serverSideNoAuthGuard(context)
}

export default Register
