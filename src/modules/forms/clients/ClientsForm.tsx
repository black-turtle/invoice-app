import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Divider } from '@mui/material'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ClientData } from '../../../api/clientApis'
import BackAndSubmitButtons from '../../../components/BackAndSubmitButtons'
import CustomTextField from '../../../components/input-components/CustomTextField'
import { DynamicFormAlert } from '../../../utils/commonDynamicComponentUtils'

const zodSchema = z.object({
    id: z.union([z.string(), z.undefined()]),
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    companyDetails: z.object({
        name: z.string().min(3, {
            message: `Company name should be at least 3 characters long`,
        }),
        address: z.string().min(1, { message: `Company address is required` }),
        vatNumber: z.string().min(1, { message: `Vat number is required` }),
        regNumber: z
            .string()
            .min(1, { message: `Registration number is required` }),
        iban: z.string().min(1, { message: 'iban is required' }),
        swift: z.string().min(1, { message: 'Swift is required' }),
    }),
})

type schemaType = z.infer<typeof zodSchema>

interface FormParams {
    formAction: (data?: any) => Promise<any> | void
    defaultValues?: ClientData
    clearFormOnSubmitSuccess?: boolean
}

const ClientsForm = (props: FormParams) => {
    const methods = useForm<schemaType>({
        // mode: 'onChange',
        resolver: zodResolver(zodSchema),
        defaultValues: props.defaultValues,
    })

    const {
        handleSubmit,
        reset,
        register,
        formState: { isSubmitting },
    } = methods

    const onSubmitHandler = async (data: any) => {
        const success = await props.formAction(data)
        if (success && props.clearFormOnSubmitSuccess) {
            reset()
        }
    }

    return (
        <FormProvider {...methods}>
            <DynamicFormAlert
                successDataTestAttr="form-success"
                errorDataTestAttr="form-error"
            />

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate
                sx={{ width: '100%' }}
            >
                <CustomTextField
                    label="Name"
                    name="name"
                    dataTestAttr="client-name"
                    dataTestErrorAttr="client-name-error"
                    isRequired
                />

                <CustomTextField
                    label="Email Address"
                    name="email"
                    dataTestAttr="client-email"
                    dataTestErrorAttr="client-email-error"
                    isRequired
                />

                <Divider sx={{ mt: 5, mb: 1 }}>Company Info</Divider>
                <CustomTextField
                    label="Company Name"
                    name="companyDetails.name"
                    dataTestAttr="client-company-name"
                    dataTestErrorAttr="client-company-name-error"
                    isRequired
                />

                <CustomTextField
                    label="Company Address"
                    name="companyDetails.address"
                    dataTestAttr="client-company-address"
                    dataTestErrorAttr="client-company-address-error"
                    isRequired
                />

                <Divider sx={{ mt: 5, mb: 1 }}>Tax Info</Divider>
                <CustomTextField
                    label="VAT number"
                    name="companyDetails.vatNumber"
                    dataTestAttr="client-company-vat"
                    dataTestErrorAttr="client-company-vat-error"
                    isRequired
                />

                <CustomTextField
                    label="Registration number"
                    name="companyDetails.regNumber"
                    dataTestAttr="client-company-reg"
                    dataTestErrorAttr="client-company-reg-error"
                    isRequired
                />

                <CustomTextField
                    label="iban"
                    name="companyDetails.iban"
                    dataTestAttr="client-company-iban"
                    dataTestErrorAttr="client-company-iban-error"
                    isRequired
                />

                <CustomTextField
                    label="Swift"
                    name="companyDetails.swift"
                    dataTestAttr="client-company-swift"
                    dataTestErrorAttr="client-company-swift-error"
                    isRequired
                />

                <BackAndSubmitButtons
                    isSubmitting={isSubmitting}
                    submitButtonText={props.defaultValues ? 'Update' : 'Submit'}
                    submitButtonDataTestAttr="submit-client"
                />
            </Box>
        </FormProvider>
    )
}

const MemorizedClientForm = React.memo(ClientsForm)
export default MemorizedClientForm
