import { Avatar, Chip, Divider, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Box, Container } from '@mui/system'
import { PropsWithChildren, ReactNode } from 'react'
import { BiLock } from 'react-icons/bi'

const isGoogleAuthRequired =
    process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === 'true'
interface IProps extends PropsWithChildren {
    googleAuthButton?: ReactNode
}

const AuthFormLayout = (props: IProps) => {
    return (
        <Container
            maxWidth="sm"
            sx={{
                my: '4rem',
                borderRadius: '7px',
            }}
        >
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <BiLock />
                </Avatar>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: '3rem',
                    }}
                >
                    {isGoogleAuthRequired && props.googleAuthButton}

                    {isGoogleAuthRequired && (
                        <Divider
                            sx={{
                                width: '100%',
                                my: 5,
                            }}
                        >
                            <Chip label="OR" />
                        </Divider>
                    )}

                    <Typography
                        variant="body1"
                        color={grey[600]}
                        sx={{ mb: 2 }}
                    >
                        Enter your credentials to continue
                    </Typography>
                    {props.children}
                </Box>
            </Box>
        </Container>
    )
}

export default AuthFormLayout
