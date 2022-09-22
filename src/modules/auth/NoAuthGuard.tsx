import { PropsWithChildren, useEffect } from 'react'
import Loader from '../../components/loader/Loader'
import useNavigate from '../../hooks/useNavigate'
import { AuthState, useAuthStore } from '../../stores/useAuthStore'

const NoAuthGuard = (props: PropsWithChildren) => {
    const authState = useAuthStore((state) => state.authState)
    const { router } = useNavigate()

    useEffect(() => {
        if (authState === AuthState.AUTH) {
            router.push('/')
        }
    }, [authState, router])

    if (authState === AuthState.NOT_AUTH) {
        return props.children
    } else {
        return <Loader fullScreen />
    }
}

export default NoAuthGuard
