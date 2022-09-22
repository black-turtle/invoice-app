import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import FormErrorText from '../FormErrorText'
import { getFormErrorMessage } from './CustomTextField'
interface IProps {
    name: string
    dataTestAttr: string
    dataTestErrorAttr: string
    label: string
    isRequired?: boolean
}

const CustomPasswordField = (props: IProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
    }

    const errorMsg = getFormErrorMessage(props.name, errors)

    return (
        <TextField
            type={showPassword ? 'text' : 'password'}
            fullWidth
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
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default CustomPasswordField
