import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import MuiLink from '@mui/material/Link'
import { Box } from '@mui/system'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import FormAlert from '../../../components/FormAlert'
import CustomPasswordField from '../../../components/input-components/CustomPasswordField'
import CustomTextField from '../../../components/input-components/CustomTextField'

const zodSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(1, { message: `Password is required` })
        .min(5, { message: `Password should be at least 5 characters long` })
        .max(16, {
            message: `Password shouldn't be more than 16 characters long`,
        }),
})

type schemaType = z.infer<typeof zodSchema>

interface FormParams {
    formAction: (data: any) => Promise<any>
}

const LoginForm = (props: FormParams) => {
    const methods = useForm<schemaType>({
        // mode: 'onChange',
        resolver: zodResolver(zodSchema),
    })

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods

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

                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    data-test="submit-login"
                    loading={isSubmitting}
                    loadingIndicator="Loading..."
                >
                    Login
                </LoadingButton>

                <Link href="/signup">
                    <MuiLink
                        component="div"
                        variant="body2"
                        underline="hover"
                        sx={{ textAlign: 'center', cursor: 'pointer' }}
                    >
                        {"Don't have an account? Register"}
                    </MuiLink>
                </Link>
            </Box>
        </FormProvider>
    )
}

export default LoginForm
