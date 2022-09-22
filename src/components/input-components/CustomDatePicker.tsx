import { TextField } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useFormContext } from 'react-hook-form'
import FormErrorText from '../FormErrorText'
import { getFormErrorMessage } from './CustomTextField'

interface IProps {
    name: string
    dataTestAttr: string
    dataTestErrorAttr: string
    label: string
    required?: boolean
    defaultValue: string
}
const CustomDatePicker = (props: IProps) => {
    const { label, required, dataTestErrorAttr, dataTestAttr, name } = props
    const isDeskTop = useMediaQuery('(min-width:600px)')

    const DatePicker = isDeskTop ? DesktopDatePicker : MobileDatePicker

    const {
        control,
        formState: { errors },
    } = useFormContext()

    const errorMsg = getFormErrorMessage(props.name, errors)

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({
                field: { onChange, value, ...rest },
                fieldState: { error },
            }) => (
                <DatePicker
                    label={label}
                    // disableFuture
                    inputFormat="yyyy/MM/dd"
                    value={value}
                    onChange={(value: any) => {
                        const newVal = moment(value).format('YYYY-MM-DD')
                        if (newVal === 'Invalid date') {
                            onChange('')
                        } else {
                            onChange(newVal)
                        }
                    }}
                    {...rest}
                    renderInput={(params: any) => {
                        return (
                            <TextField
                                fullWidth
                                required={required}
                                margin="normal"
                                data-test={dataTestAttr}
                                {...params}
                                error={!!error}
                                helperText={
                                    <FormErrorText
                                        dataTest={dataTestErrorAttr}
                                        error={errorMsg}
                                    />
                                }
                            />
                        )
                    }}
                />
            )}
        />
    )
}

export default CustomDatePicker
