import { AxiosError } from 'axios'
import { useFormAlertStore } from '../stores/useFormAlertStore'
import { HttpStatus, MessageType } from '../stores/useNotificationStore'
import { handleApiErrors } from './ErrorUtils'

export interface ApiExecutorResponse<T> {
    data: T | null
    error: Error | null
}

export const executeApi = async <T>(api: () => T, isFormAction?: boolean) => {
    let data: Awaited<T> | null = null
    let error: AxiosError | null = null

    try {
        data = await api()

        if (isFormAction) {
            useFormAlertStore.setState({
                type: MessageType.SUCCESS,
                message: 'Success!',
                httpCode: HttpStatus.OK,
            })
        }
    } catch (err) {
        handleApiErrors(err as Error, isFormAction)
    }
    return { data, error }
}
