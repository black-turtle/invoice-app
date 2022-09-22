import { GetServerSideProps, NextPage } from 'next'
import { LoginFormContainer } from '../src/modules/forms/login/LoginFormContainer'
import { DynamicAnimationLayout } from '../src/utils/commonDynamicComponentUtils'
import { serverSideNoAuthGuard } from '../src/utils/serverSideAuthUtils'

const Login: NextPage = () => {
    return (
        <DynamicAnimationLayout>
            <LoginFormContainer />
        </DynamicAnimationLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return serverSideNoAuthGuard(context)
}

export default Login
