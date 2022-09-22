import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Container, Typography } from '@mui/material'
import Head from 'next/head'
import NextLink from 'next/link'
const NotFoundComponent = () => {
    return (
        <div>
            <Head>
                <title>404 | Not Found</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100vh',
                    my: 5
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="h3"
                            data-test="not-found-message"
                        >
                            404: The page you are looking for isn’t here
                        </Typography>
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="subtitle1"
                        >
                            You either tried some shady route or you came here
                            by mistake. Whichever it is, try using the
                            navigation
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                                alt="Under development"
                                src="/images/404.svg"
                                style={{
                                    marginTop: 50,
                                    display: 'inline-block',
                                    maxWidth: '100%',
                                    width: 560
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

export default NotFoundComponent
