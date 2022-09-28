import { signIn } from 'next-auth/react'
import { useLayoutEffect } from 'react'
import { registerApi, RegisterApiParams } from '../../../api/authApi'
import GoogleAuthButton from '../../../components/GoogleAuthButton'
import AuthFormLayout from '../../../components/layouts/AuthFormLayout'
import useNavigate from '../../../hooks/useNavigate'
import { useAuthStore } from '../../../stores/useAuthStore'
import { useFormAlertStore } from '../../../stores/useFormAlertStore'
import RegisterForm from './RegisterForm'

export const RegisterFormContainer = () => {
    const { router } = useNavigate()
    const register = useAuthStore((state) => state.register)

    useLayoutEffect(() => {
        // clear formNotification as we need to change page
        useFormAlertStore.getState().reset()
    }, [])

    const onSubmitHandler = async (params: RegisterApiParams) => {
        return register(() => registerApi(params)).then((success) => {
            if (success) {
                router.replace('/login')
            }
        })
    }

    const googleAuthHandler = async () => {
        await signIn('google')
    }

    return (
        <AuthFormLayout
            googleAuthButton={
                <GoogleAuthButton
                    text="Register with Google"
                    onClickAction={googleAuthHandler}
                />
            }
        >
            <RegisterForm formAction={onSubmitHandler} />
        </AuthFormLayout>
    )
}
