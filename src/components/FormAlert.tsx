import { Alert, Box } from '@mui/material'
import { useFormAlertStore } from '../stores/useFormAlertStore'
import { MessageType } from '../stores/useNotificationStore'

export interface AlertProps {
    successDataTestAttr?: string
    errorDataTestAttr?: string
}

const FormAlert = (props: AlertProps) => {
    const { message, type: notificationType } = useFormAlertStore()

    if (!message) return null

    let dataTestLabel = props.errorDataTestAttr ?? 'form-error'

    if (notificationType === MessageType.SUCCESS) {
        dataTestLabel = props.successDataTestAttr ?? 'success-message'
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Alert
                severity={notificationType}
                sx={{ textAlign: 'center', my: 3 }}
                data-test={dataTestLabel}
            >
                {message}
            </Alert>
        </Box>
    )
}

export default FormAlert
