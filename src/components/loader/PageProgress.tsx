import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
import useNavigate from '../../hooks/useNavigate'

NProgress.configure({ showSpinner: false, easing: '' })

const PageChangeLoader = () => {
    const { router } = useNavigate()

    // show progress bar while page changing
    useEffect(() => {
        const handleStart = (url: string) => {
            NProgress.start()
        }

        const handleStop = () => {
            NProgress.done()
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    // this component doesn't display anything
    return null
}

export default PageChangeLoader
