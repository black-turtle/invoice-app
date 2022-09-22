import { capitalize } from '@mui/material'
import { AxiosError } from 'axios'
import { useFormAlertStore } from '../stores/useFormAlertStore'
import {
    HttpStatus,
    MessageType,
    useNotificationStore,
} from '../stores/useNotificationStore'

const handleGlobalApiErrors = (error: AxiosError) => {
    if (error.response?.data === 'Invalid Token') {
        useNotificationStore.setState({
            type: MessageType.ERROR,
            message: 'Token expired, Please re-login to continue',
            httpCode: HttpStatus.INVALID_TOKEN,
        })
        return true
    } else if (error.message === 'Network Error') {
        useNotificationStore.setState({
            type: MessageType.ERROR,
            message: 'Oops Server down. Please try again later',
            httpCode: HttpStatus.NETWORK_ERROR,
        })
        return true
    }
    return false
}

const getErrorMessage = (error: Error) => {
    if (error instanceof AxiosError) {
        return capitalize(error.response?.data?.toString())
    }
    if (error.message) {
        return capitalize(error.message.toString())
    }

    return null
}

/**
 * This is the global api error handler.
 * We are invoking all apis via useAsync hook or apiExecutor class
 * Both of them invokes this util function if any error found
 *
 * @param  {Error} error
 * @param  {boolean} isFormAction?
 */
export const handleApiErrors = (error: Error, isFormAction?: boolean) => {
    const handled = handleGlobalApiErrors(error as AxiosError)

    if (!handled) {
        const message = getErrorMessage(error)

        if (!message) {
            console.error('Unhandled error detected: ', error)
        } else {
            console.warn('API error detected: ', message)
        }

        // if its form action we need to set form alert message
        // I am clearing or resetting it in useNavigate hook (when page changes)
        if (isFormAction) {
            useFormAlertStore.setState({
                type: MessageType.ERROR,
                message: message,
            })
        }
    }
}
