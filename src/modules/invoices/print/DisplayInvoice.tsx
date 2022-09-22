import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ReactNode } from 'react'

import QRCode from 'react-qr-code'
import CustomSkeleton from '../../../components/loader/CustomSkeleton'

interface GeneralInfoProps {
    date: string
    dueDate: string
    invoice_number: string
    project_code: string
    company: string
}

export const GeneralInfo = (props: { data: GeneralInfoProps }) => {
    return (
        <>
            <Typography sx={{ my: 2 }} variant="h5" component="div">
                Invoice Data
            </Typography>
            <Card>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                        sx={{ justifyContent: 'space-around' }}
                    >
                        <Grid item xs={6}>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                Invoice Number
                            </Typography>
                            <Typography color="textPrimary" variant="h5">
                                {props.data.invoice_number}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                Project Code
                            </Typography>
                            <Typography color="textPrimary" variant="h5">
                                {props.data.project_code}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                Company
                            </Typography>
                            <Typography color="textPrimary" variant="h5">
                                {props.data.company}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                Date
                            </Typography>
                            <Typography color="textPrimary" variant="h5">
                                {props.data.date}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                Due date
                            </Typography>
                            <Typography color="textPrimary" variant="h5">
                                {props.data.dueDate}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export const QR_CODE_ID = 'invoice-qr-code'
export const DisplayQrCode = () => {
    return (
        <div className="avoid-page-break" id={QR_CODE_ID}>
            <Box sx={{ py: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <QRCode value={location.href} />
                </Box>
                <Typography variant="h5" sx={{ textAlign: 'center', pt: 2 }}>
                    Please scan this Qr code to check or verify
                </Typography>

                <Typography
                    variant="subtitle2"
                    sx={{ textAlign: 'center', py: 1 }}
                >
                    Note: You will be required to login to access invoice data.
                </Typography>
            </Box>
        </div>
    )
}

interface DisplayInvoiceParams {
    values: GeneralInfoProps | null
    ItemsContainer: ReactNode
}

const DisplayInvoice = (props: DisplayInvoiceParams) => {
    if (props.values) {
        return (
            <>
                <GeneralInfo data={props.values} />
                {props.ItemsContainer}
                <DisplayQrCode />
            </>
        )
    }

    return <CustomSkeleton />
}

export default DisplayInvoice
