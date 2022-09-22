import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import MuiLink from '@mui/material/Link'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import FormAlert from '../../../components/FormAlert'
import CustomPasswordField from '../../../components/input-components/CustomPasswordField'
import CustomTextField from '../../../components/input-components/CustomTextField'

const zodSchema = z
    .object({
        name: z.string().min(1, { message: 'Name is required' }),
        email: z
            .string()
            .min(1, { message: 'Email is required' })
            .email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(1, { message: `Password is required` })
            .min(5, {
                message: `Password should be at least 5 characters long`,
            })
            .max(16, {
                message: `Password shouldn't be more than 16 characters long`,
            }),
        confirmPassword: z
            .string()
            .min(1, { message: `Confirm Password is required` }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'], // path of error
        message: "Passwords don't match",
    })

type schemaType = z.infer<typeof zodSchema>

interface FormParams {
    formAction: (data: any) => Promise<any>
}

const RegisterForm = (props: FormParams) => {
    const methods = useForm<schemaType>({
        mode: 'onChange',
        resolver: zodResolver(zodSchema),
    })

    const {
        handleSubmit,
        formState: { isSubmitting, isSubmitted },
    } = methods

    // manually trigger password & confirmPassword validation
    // isSubmitted && trigger(['confirmPassword'])

    return (
        <FormProvider {...methods}>
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
                    label="Name"
                    name="name"
                    dataTestAttr="name"
                    dataTestErrorAttr="name-error"
                    isRequired
                />

                <CustomTextField
                    label="Email Address"
                    name="email"
                    dataTestAttr="email"
                    dataTestErrorAttr="email-error"
                    isRequired
                />

                <CustomPasswordField
                    name="password"
                    label="Password"
                    dataTestAttr="password"
                    dataTestErrorAttr="password-error"
                    isRequired
                />

                <CustomPasswordField
                    name="confirmPassword"
                    label="Confirm Password"
                    dataTestAttr="confirm-password"
                    dataTestErrorAttr="confirm-password-error"
                    isRequired
                />

                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    data-test="submit-sign-up"
                    loading={isSubmitting}
                    loadingIndicator="Loading..."
                >
                    Register
                </LoadingButton>

                <Link href="/login">
                    <MuiLink
                        component="div"
                        variant="body2"
                        underline="hover"
                        sx={{ textAlign: 'center', cursor: 'pointer' }}
                    >
                        {'Already have an account? Sign In'}
                    </MuiLink>
                </Link>
            </Box>
        </FormProvider>
    )
}

export default RegisterForm
