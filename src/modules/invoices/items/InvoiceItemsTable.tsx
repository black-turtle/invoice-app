import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useInvoiceItemStore } from '../../../stores/useInvoiceItemsStore'
import { convertToCurrency } from '../../../utils/convertUtils'

const BoldCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.primary.main,
}))

const HoverRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
}))

export default function InvoiceItemsTable() {
    const openModal = useInvoiceItemStore((state) => state.openModal)
    const setItems = useInvoiceItemStore((state) => state.setItems)
    const items = useInvoiceItemStore((state) => state.items)
    const viewMode = useInvoiceItemStore((state) => state.viewMode)
    const getTotalPrice = useInvoiceItemStore((state) => state.getTotalPrice)

    const total = getTotalPrice()

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <HoverRow>
                            <BoldCell>No</BoldCell>
                            <BoldCell>Description</BoldCell>
                            <BoldCell align="right">Price</BoldCell>
                            {!viewMode && <BoldCell></BoldCell>}
                        </HoverRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row, idx) => (
                            <TableRow
                                key={`${idx}-${row.description}`}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="td" scope="row">
                                    {idx + 1}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                    <pre>{row.description}</pre>
                                </TableCell>
                                <TableCell
                                    component="td"
                                    scope="row"
                                    align="right"
                                >
                                    {convertToCurrency(row.price)}
                                </TableCell>
                                {!viewMode && (
                                    <TableCell
                                        component="td"
                                        scope="row"
                                        align="right"
                                    >
                                        <Stack
                                            direction="row"
                                            sx={{ justifyContent: 'right' }}
                                        >
                                            <IconButton
                                                aria-label="delete"
                                                color="primary"
                                                onClick={() => {
                                                    // setItemIdx(idx)
                                                    // setShowModal(true)
                                                    openModal('edit', idx)
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => {
                                                    setItems(
                                                        items.filter(
                                                            (item, index) =>
                                                                index !== idx,
                                                        ),
                                                    )
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}

                        <HoverRow
                            // key={row.description}
                            sx={{ bg: 'red' }}
                        >
                            <TableCell component="td" scope="row" />
                            <BoldCell component="td" scope="row" align="right">
                                Total
                            </BoldCell>
                            <BoldCell component="td" scope="row" align="right">
                                {convertToCurrency(total)}
                            </BoldCell>
                            {!viewMode && (
                                <TableCell component="td" scope="row" />
                            )}
                        </HoverRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* {showModal && (
                <InvoiceItemEditor
                    mode="edit"
                    {...props}
                    onCloseModal={() => setShowModal(false)}
                    itemIdx={itemIdx}
                />
            )} */}
        </>
    )
}
