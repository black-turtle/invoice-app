import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { InvoiceData, InvoiceItem } from '../../../api/invoiceApis'
import BackAndSubmitButtons from '../../../components/BackAndSubmitButtons'
import FormAlert from '../../../components/FormAlert'
import FormErrorText from '../../../components/FormErrorText'
import CustomComboBox from '../../../components/input-components/CustomComboBox'
import CustomDatePicker from '../../../components/input-components/CustomDatePicker'
import CustomTextField from '../../../components/input-components/CustomTextField'
import { convertToDate } from '../../../utils/convertUtils'
import InvoiceItemsContainer from '../../invoices/items/InvoiceItemsContainer'

const zodSchema = z
    .object({
        id: z.union([z.string(), z.undefined()]),
        date: z.string().min(1, { message: 'Invoice Date is required' }),
        dueDate: z.string().min(1, { message: 'Invoice Due date is required' }),
        invoice_number: z
            .string()
            .min(1, { message: 'Invoice Number is required' })
            .min(3, {
                message: `Invoice Number should be at least 3 characters long`,
            }),
        projectCode: z.union([
            z.string().min(3, {
                message: 'Project code should be at least 3 characters long',
            }),
            z.string().max(0),
        ]),
        client_id: z.string().min(1, { message: 'Invoice Client is required' }),
        items: z.number().positive({ message: 'At lease 1 item is required' }),
    })
    .refine(
        (data) => {
            const date = new Date(data.date)
            const dueDate = new Date(data.dueDate)

            return date <= dueDate
        },
        {
            path: ['dueDate'], // path of error
            message: 'Error: Due date should be after invoice date',
        },
    )

type schemaType = z.infer<typeof zodSchema>

interface FormParams {
    formAction: (data?: any) => Promise<any> | void
    defaultValues?: InvoiceData
    companyNames: string[]
    defaultCompany?: string
    items: InvoiceItem[]
}

const InvoiceForm = (props: FormParams) => {
    const methods = useForm<schemaType>({
        // mode: 'onChange',
        resolver: zodResolver(zodSchema),
        defaultValues: util.generateValuesForForm(
            props.defaultValues,
            props.defaultCompany,
            props.items,
        ),
    })
    const {
        handleSubmit,
        setValue,
        getValues,
        trigger,
        formState: { isSubmitting, isSubmitted, errors },
    } = methods

    // Manually set invoice items input just to show appropriate error in form component.
    // Invoice items are managed outside of this form
    useEffect(() => {
        if (getValues('items') !== props.items.length && isSubmitted) {
            setValue('items', props.items.length)
            trigger('items')
        }
    })

    return (
        <FormProvider {...methods}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormAlert
                    successDataTestAttr="form-success"
                    errorDataTestAttr="form-error"
                />
                <Box
                    component="form"
                    onSubmit={handleSubmit(props.formAction)}
                    noValidate
                    sx={{ width: '100%' }}
                >
                    <CustomTextField
                        label="Invoice Number"
                        name="invoice_number"
                        dataTestAttr="invoice-number-name"
                        dataTestErrorAttr="invoice-number-error"
                        isRequired
                    />

                    <CustomTextField
                        label="Project code"
                        name="projectCode"
                        dataTestAttr="invoice-project-code"
                        dataTestErrorAttr="invoice-project-code-error"
                    />

                    <CustomComboBox
                        label="Client's Company"
                        name="client_id"
                        dataTestAttr="invoice-company-id"
                        dataTestErrorAttr="invoice-company-id-error"
                        isRequired
                        options={props.companyNames}
                        defaultValue={props.defaultCompany}
                    />

                    <CustomDatePicker
                        label="Invoice Date"
                        name="date"
                        dataTestAttr="invoice-date"
                        dataTestErrorAttr="invoice-date-error"
                        required
                        defaultValue=""
                    />

                    <CustomDatePicker
                        label="Invoice Due Date"
                        name="dueDate"
                        dataTestAttr="invoice-due-date"
                        dataTestErrorAttr="invoice-due-date-error"
                        required
                        defaultValue=""
                    />

                    {/* Invoice items container (Invoice item from is managed by it) */}
                    <InvoiceItemsContainer />

                    {errors.items?.message && (
                        <FormErrorText
                            dataTest="invoice-item-error"
                            error={errors.items.message}
                        />
                    )}

                    <BackAndSubmitButtons
                        isSubmitting={isSubmitting}
                        submitButtonText={
                            props.defaultValues ? 'Update' : 'Submit'
                        }
                        submitButtonDataTestAttr="submit-invoice"
                    />
                </Box>
            </LocalizationProvider>
        </FormProvider>
    )
}
const MemorizedInvoiceForm = React.memo(InvoiceForm)

export default MemorizedInvoiceForm

const util = {
    generateValuesForForm: (
        propDefaultValue?: InvoiceData,
        defaultCompany?: string,
        items?: InvoiceItem[],
    ) => {
        if (!propDefaultValue) return propDefaultValue

        return {
            ...propDefaultValue,
            date: convertToDate(propDefaultValue.date),
            dueDate: convertToDate(propDefaultValue.dueDate),
            client_id: defaultCompany,
            items: items?.length ?? 0,
        }
    },
}
