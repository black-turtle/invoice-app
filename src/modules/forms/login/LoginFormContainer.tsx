import { signIn } from 'next-auth/react'
import { useLayoutEffect } from 'react'
import { loginApi, LoginApiParams } from '../../../api/authApi'
import GoogleAuthButton from '../../../components/GoogleAuthButton'
import AuthFormLayout from '../../../components/layouts/AuthFormLayout'
import useNavigate from '../../../hooks/useNavigate'
import { useAuthStore } from '../../../stores/useAuthStore'
import { useFormAlertStore } from '../../../stores/useFormAlertStore'
import LoginForm from './LoginForm'

export const LoginFormContainer = () => {
    const { router } = useNavigate()
    const login = useAuthStore((state) => state.login)

    useLayoutEffect(() => {
        // clear formNotification as we need to change page
        useFormAlertStore.getState().reset()
    }, [])

    const onSubmitHandler = async (params: LoginApiParams) => {
        return login(() => loginApi(params)).then((user) => {
            if (user) {
                // clear formNotification as we need to change page
                useFormAlertStore.getState().reset()

                user?.companyDetails
                    ? router.replace('/')
                    : router.replace('/company-details')
            }
        })
    }

    const googleLoginHandler = async () => {
        await signIn('google')
    }

    return (
        <AuthFormLayout
            googleAuthButton={
                <GoogleAuthButton
                    text="Sign in with Google"
                    onClickAction={googleLoginHandler}
                />
            }
        >
            <LoginForm formAction={onSubmitHandler} />
        </AuthFormLayout>
    )
}
