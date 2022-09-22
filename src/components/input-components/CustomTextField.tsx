import { TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import FormErrorText from '../FormErrorText'

export const getFormErrorMessage = (name: string, errors: unknown) => {
    // extract nested error message (eg: name = companyDetails.address) if required
    const parts = name.split('.')
    let error: any = errors
    for (const part of parts) {
        if (!error) break
        error = error[part]
    }
    return error?.message?.toString() || undefined
}

interface IProps {
    name: string
    dataTestAttr: string
    dataTestErrorAttr: string
    label: string
    type?: string
    isRequired?: boolean
}

const CustomTextField = (props: IProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const errorMsg = getFormErrorMessage(props.name, errors)

    return (
        <TextField
            fullWidth
            type={props.type ?? 'text'}
            required={props.isRequired}
            margin="normal"
            label={props.label}
            {...register(props.name)}
            error={!!errorMsg}
            inputProps={{ 'data-test': props.dataTestAttr }}
            helperText={
                <FormErrorText
                    dataTest={props.dataTestErrorAttr}
                    error={errorMsg}
                />
            }
        />
    )
}

export default CustomTextField
