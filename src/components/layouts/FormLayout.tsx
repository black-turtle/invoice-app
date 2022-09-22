import { Avatar, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { PropsWithChildren, ReactNode } from 'react'
import CustomSkeleton from '../loader/CustomSkeleton'

interface FormLayoutProps extends PropsWithChildren {
    logo: ReactNode
    title: string
    isLoading?: boolean
    // alert?: AlertProps
}

const FormLayout = (props: FormLayoutProps) => {
    return (
        <Container maxWidth="sm" sx={{ mb: '4rem' }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    {props.logo}
                </Avatar>

                <Typography
                    component="span"
                    variant="h6"
                    sx={{
                        m: 1,
                        color: 'primary.main',
                        textAlign: 'center',
                    }}
                >
                    {props.title}
                </Typography>

                <Box sx={{ mt: 3, width: '100%' }}>
                    {props.isLoading && <CustomSkeleton />}
                    {!props.isLoading && props.children}
                </Box>
            </Box>
        </Container>
    )
}

export default FormLayout
