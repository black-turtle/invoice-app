import { Slide, SlideProps } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import { deleteCookie, getCookie } from 'cookies-next'
import { signOut } from 'next-auth/react'
import * as React from 'react'
import { PropsWithChildren, useEffect } from 'react'
import useNavigate from '../hooks/useNavigate'
import { COOKIE_USE_GOOGLE_AUTH, useAuthStore } from '../stores/useAuthStore'
import {
    HttpStatus,
    MessageType,
    useNotificationStore,
} from '../stores/useNotificationStore'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />
}

let curMessage: string | null = null
let notificationType: MessageType | undefined
export default function NotificationContainer({ children }: PropsWithChildren) {
    const [open, setOpen] = React.useState(false)
    const {
        message,
        httpCode,
        type,
        reset: resetNotificationStore,
    } = useNotificationStore()
    const logout = useAuthStore((state) => state.logout)
    const { navigateTo } = useNavigate()

    useEffect(() => {
        if (message) {
            curMessage = message
            notificationType = type
            resetNotificationStore()

            handleClick()

            if (httpCode === HttpStatus.INVALID_TOKEN) {
                logout().then(() => {
                    if (getCookie(COOKIE_USE_GOOGLE_AUTH)) {
                        deleteCookie(COOKIE_USE_GOOGLE_AUTH)
                        signOut({ callbackUrl: '/login' })
                    } else {
                        navigateTo('/login')
                    }
                })
            }
        }
    }, [httpCode, logout, message, navigateTo, resetNotificationStore, type])

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <>
            {children}

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar
                    open={open}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    TransitionComponent={SlideTransition}
                    autoHideDuration={2000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity={notificationType}
                        sx={{ width: '100%' }}
                        data-test={
                            notificationType === MessageType.ERROR
                                ? 'error-notification'
                                : 'success-notification'
                        }
                    >
                        {curMessage}
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    )
}
