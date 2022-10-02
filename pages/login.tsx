import { Box, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { LoginFormContainer } from '../src/modules/forms/login/LoginFormContainer'
import { DynamicAnimationLayout } from '../src/utils/commonDynamicComponentUtils'
import { serverSideNoAuthGuard } from '../src/utils/serverSideAuthUtils'

const DemoCredential = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                m: '10px',
                mb: '10vh',
            }}
        >
            <Box sx={{ maxWidth: '500px' }}>
                <Typography variant="body2" sx={{ color: 'gray', mb: '15px' }}>
                    Creating new user comes with empty clients and invoices
                    data. If you wish to Test with data, please use this
                    credential
                </Typography>
                <Typography variant="subtitle1">
                    <span style={{ fontWeight: 'bold' }}>Email: </span>
                    <span style={{ fontStyle: 'italic' }}>
                        fake_user5@officehourtesting.com
                    </span>
                </Typography>
                <Typography variant="subtitle1">
                    <span style={{ fontWeight: 'bold' }}>Password: </span>
                    <span style={{ fontStyle: 'italic' }}>123456</span>
                </Typography>
            </Box>
        </Box>
    )
}

const Login: NextPage = () => {
    return (
        <DynamicAnimationLayout>
            <LoginFormContainer />
            <DemoCredential />
        </DynamicAnimationLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return serverSideNoAuthGuard(context)
}

export default Login
