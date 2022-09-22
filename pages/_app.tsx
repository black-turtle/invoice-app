import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import ErrorBoundary from '../src/components/ErrorBoundary'

import theme from '../src/utils/theme'
import '../styles/globals.css'

const DynamicPageProgress = dynamic(
    () => import('../src/components/loader/PageProgress'),
    {
        ssr: false,
    },
)

const DynamicNotificationContainer = dynamic(
    () => import('../src/components/NotificationContainer'),
    {
        ssr: false,
    },
)

const DynamicAnimatePresence = dynamic<any>(
    () =>
        import('../src/components/animation').then(
            (module) => module.AnimatePresence,
        ),
    {
        ssr: false,
    },
)

export default function MyApp(props: AppProps) {
    const { Component, pageProps } = props

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DynamicPageProgress />
            <SessionProvider session={pageProps.session}>
                <ErrorBoundary>
                    <DynamicNotificationContainer>
                        <DynamicAnimatePresence
                            // exitBeforeEnter
                            mode="wait"
                            initial={false}
                            onExitComplete={() => window.scrollTo(0, 0)}
                        >
                            <Component {...pageProps} />
                        </DynamicAnimatePresence>
                    </DynamicNotificationContainer>
                </ErrorBoundary>
            </SessionProvider>
        </ThemeProvider>
    )
}
