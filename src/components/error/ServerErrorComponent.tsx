import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Container, Typography } from '@mui/material'
import Head from 'next/head'
import NextLink from 'next/link'

interface ServerErrorComponentProps {
    message?: string
}

const ServerErrorComponent = (props: ServerErrorComponentProps) => {
    return (
        <div>
            <Head>
                <title>500 | Server error</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100vh',
                    my: 5,
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="h3"
                            data-test="not-found-message"
                        >
                            Internal Server error
                        </Typography>
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="subtitle1"
                        >
                            {props.message && (
                                <Typography
                                    sx={{
                                        fontSize: '1.5rem',
                                        color: (theme) =>
                                            theme.palette.error.main,
                                    }}
                                >
                                    {props.message}
                                </Typography>
                            )}
                            {!props.message &&
                                `Opps, something went wrong. We apologize and will be fixing this issue soon. Please check again later.`}
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                                alt="Under development"
                                src="/images/500.png"
                                style={{
                                    marginTop: 50,
                                    display: 'inline-block',
                                    maxWidth: '100%',
                                    width: 560,
                                }}
                            />
                        </Box>
                        <NextLink href="/" passHref>
                            <Button
                                component="a"
                                startIcon={<ArrowBackIcon fontSize="small" />}
                                sx={{ mt: 3 }}
                                variant="contained"
                            >
                                Go back to dashboard
                            </Button>
                        </NextLink>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default ServerErrorComponent
