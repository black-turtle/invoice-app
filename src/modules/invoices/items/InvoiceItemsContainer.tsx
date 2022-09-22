import AddIcon from '@mui/icons-material/Add'
import { Fab, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useInvoiceItemStore } from '../../../stores/useInvoiceItemsStore'
import InvoiceItemEditor from './InvoiceItemEditor'
import InvoiceItemsTable from './InvoiceItemsTable'

const InvoiceItemsContainer = () => {
    // const [showModal, setShowModal] = React.useState(false)
    const items = useInvoiceItemStore(state => state.items)
    const openModal = useInvoiceItemStore(state => state.openModal)
    const isModalOpen = useInvoiceItemStore(state => state.isModalOpen)
    const viewMode = useInvoiceItemStore(state => state.viewMode)


    return (
        <Box sx={{ mb: 2, mt: 5 }}>
            <Stack
                direction="row"
                spacing={3}
                sx={{ my: 2, alignItems: 'baseline' }}
            >
                <Typography variant="h5" gutterBottom>
                    Items
                </Typography>
                {!viewMode && (
                    <Fab
                        color="primary"
                        aria-label="edit"
                        size="small"
                        onClick={() => openModal('create', -1)}
                    >
                        <AddIcon />
                    </Fab>
                )}
            </Stack>
            {items.length > 0 && <InvoiceItemsTable />}

            {items.length === 0 && (
                <Typography sx={{ textAlign: 'center' }}>
                    No Item present
                </Typography>
            )}
            
            { isModalOpen && <InvoiceItemEditor />}
        </Box>
    )
}

export default InvoiceItemsContainer
