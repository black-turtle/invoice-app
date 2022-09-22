import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CompanyDetails } from '../../../api/clientApis'
import BackAndSubmitButtons from '../../../components/BackAndSubmitButtons'
import CustomTextField from '../../../components/input-components/CustomTextField'
import { DynamicFormAlert } from '../../../utils/commonDynamicComponentUtils'

const zodSchema = z.object({
    name: z
        .string()
        .min(3, {
            message: `Company name should be at least 3 characters long`,
        })
        .max(16, {
            message: `Company name shouldn't be more than 16 characters long`,
        }),
    address: z.string().min(1, { message: `Company address is required` }),
    vatNumber: z.string().min(1, { message: `Vat number is required` }),
    regNumber: z
        .string()
        .min(1, { message: `Registration number is required` }),
    iban: z.string(),
    swift: z.string(),
})

type schemaType = z.infer<typeof zodSchema>

interface FormParams {
    formAction: (data?: any) => Promise<any> | void
    defaultValues?: CompanyDetails
}

const CompanyDetailForm = (props: FormParams) => {
    const methods = useForm<schemaType>({
        // mode: 'onChange',
        defaultValues: props.defaultValues,
        resolver: zodResolver(zodSchema),
    })

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods

    return (
        <FormProvider {...methods}>
            <DynamicFormAlert
                successDataTestAttr="success-message"
                errorDataTestAttr="error-message"
            />
            <Box
                component="form"
                onSubmit={handleSubmit(props.formAction)}
                noValidate
                sx={{ width: '100%' }}
            >
                <CustomTextField
                    label="Company Name"
                    name="name"
                    dataTestAttr="company-name"
                    dataTestErrorAttr="company-name-error"
                    isRequired
                />

                <CustomTextField
                    label="Company Address"
                    name="address"
                    dataTestAttr="company-address"
                    dataTestErrorAttr="company-address-error"
                    isRequired
                />

                <CustomTextField
                    label="VAT number"
                    name="vatNumber"
                    dataTestAttr="company-vat"
                    dataTestErrorAttr="company-vat-error"
                    isRequired
                />

                <CustomTextField
                    label="Registration number"
                    name="regNumber"
                    dataTestAttr="company-reg-number"
                    dataTestErrorAttr="company-reg-number-error"
                    isRequired
                />

                <CustomTextField
                    label="iban"
                    name="iban"
                    dataTestAttr="company-iban"
                    dataTestErrorAttr="company-iban-error"
                />

                <CustomTextField
                    label="Swift"
                    name="swift"
                    dataTestAttr="company-swift"
                    dataTestErrorAttr="company-swift-error"
                />

                {props.defaultValues && (
                    <BackAndSubmitButtons
                        isSubmitting={isSubmitting}
                        submitButtonText={'Update'}
                        submitButtonDataTestAttr="submit-company-details"
                    />
                )}
                {!props.defaultValues && (
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        data-test="submit-company-details"
                        loading={isSubmitting}
                        loadingIndicator="Loading..."
                    >
                        {'Submit'}
                    </LoadingButton>
                )}
            </Box>
        </FormProvider>
    )
}
const MemorizedCompanyDetailForm = React.memo(CompanyDetailForm)
export default MemorizedCompanyDetailForm
