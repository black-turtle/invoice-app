import { PropsWithChildren, useEffect } from 'react'
import Loader from '../../components/loader/Loader'
import useNavigate from '../../hooks/useNavigate'
import { AuthState, useAuthStore } from '../../stores/useAuthStore'
import {
    HttpStatus,
    MessageType,
    useNotificationStore,
} from '../../stores/useNotificationStore'

interface AuthGuardProps extends PropsWithChildren {}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const authState = useAuthStore((state) => state.authState)
    const logout = useAuthStore((state) => state.logout)
    const loginUsingCookieIfNeeded = useAuthStore(
        (state) => state.loginUsingCookieIfNeeded,
    )
    const apiResponseCode = useNotificationStore((state) => state.httpCode)
    const setNotification = useNotificationStore((state) => state.setData)
    const { navigateTo } = useNavigate()

    const { router } = useNavigate()

    useEffect(() => {
        loginUsingCookieIfNeeded().then((user) => {
            if (!user) {
                router.push('/login')
            } else if (
                user &&
                !user?.companyDetails &&
                router.asPath !== '/company-details'
            ) {
                setNotification(
                    MessageType.WARNING,
                    'Company Info not found. Please provide company details to access other pages.',
                    HttpStatus.IGNORE,
                )
                // if user is authenticated he must provide company details first, if not provided
                router.push('/company-details')
            }
        })
    }, [
        apiResponseCode,
        loginUsingCookieIfNeeded,
        logout,
        navigateTo,
        router,
        setNotification,
    ])

    if (authState === AuthState.AUTH) {
        return <>{children}</>
    } else {
        return <Loader fullScreen />
    }
}

export default AuthGuard
