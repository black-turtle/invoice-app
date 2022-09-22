import {
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput
} from '@mui/material'
interface TextInputProps {
    type?: string
    label: string
    required?: boolean
    property: string
    register: any
    errorMessage?: string
}

const TextInput = (props: TextInputProps) => {
    const computedLabel = props.required ? props.label + ' *' : props.label

    return (
        <FormControl error={!!props.errorMessage} sx={{ mt: 3, width: '100%' }}>
            <InputLabel htmlFor={props.property}>{computedLabel}</InputLabel>
            <OutlinedInput
                id={props.property}
                label={computedLabel}
                autoComplete={props.property}
                {...props.register}
                inputProps={{ 'data-test': props.property }}
            />
            {props.errorMessage && (
                <FormHelperText
                    id="component-error-text"
                    data-test={`${props.property}-error`}
                >
                    {props.errorMessage}
                </FormHelperText>
            )}
        </FormControl>
    )
}

export default TextInput
