import { Grid } from '@mui/material'
import DashboardClientsTableContainer from './DashBoardClientsTableContainer'
import DashboardInvoiceTableContainer from './DashBoardInvoiceTableContainer'

const DashBoardContainer = () => {
    return (
        <Grid container spacing={1} sx={{ mt: 5 }}>
            <Grid item xs={12} sm={6}>
                <DashboardInvoiceTableContainer />
            </Grid>

            <Grid item xs={12} sm={6}>
                <DashboardClientsTableContainer />
            </Grid>
        </Grid>
    )
}

export default DashBoardContainer
