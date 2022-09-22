import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useFormAlertStore } from '../stores/useFormAlertStore'

const useNavigate = () => {
    const router = useRouter()

    const updateRouterQuery = useCallback(
        (updateValues: Record<string, string | undefined>) => {
            const newQuery = { ...router.query }
            Object.keys(updateValues).forEach((key) => {
                if (updateValues[key]) {
                    newQuery[key] = updateValues[key]
                } else {
                    delete newQuery[key]
                }
            })

            router.push({
                pathname: router.pathname,
                query: newQuery,
            })
        },
        [router],
    )

    const navigateTo = useCallback(
        (newPath?: string) => {
            // clear formNotification message on page change
            useFormAlertStore.getState().reset()

            newPath && router.push(newPath)
        },
        [router],
    )

    return {
        updateRouterQuery,
        navigateTo,
        routerQuery: router.query,
        isReady: router.isReady,
        router,
    }
}

export default useNavigate
