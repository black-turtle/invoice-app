import { Autocomplete, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import FormErrorText from '../FormErrorText'
import { getFormErrorMessage } from './CustomTextField'

interface IProps {
    name: string
    dataTestAttr: string
    dataTestErrorAttr: string
    label: string
    isRequired?: boolean
    options: string[]
    defaultValue?: string
}

const CustomComboBox = (props: IProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()

    const errorMsg = getFormErrorMessage(props.name, errors)

    return (
        <Controller
            name={props.name}
            control={control}
            defaultValue=""
            render={({
                field: { onChange, value, ...rest },
                fieldState: { error },
            }) => (
                <Autocomplete
                    fullWidth
                    disablePortal
                    onChange={(event, newValue) => {
                        onChange(newValue ?? '')
                    }}
                    options={props.options}
                    defaultValue={
                        props.defaultValue === ''
                            ? undefined
                            : props.defaultValue
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={props.label}
                            margin="normal"
                            required
                            data-test={props.dataTestAttr}
                            error={!!errorMsg}
                            helperText={
                                <FormErrorText
                                    dataTest={props.dataTestErrorAttr}
                                    error={errorMsg}
                                />
                            }
                        />
                    )}
                />
            )}
        />
    )
}

export default CustomComboBox
