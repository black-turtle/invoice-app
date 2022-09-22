import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { ReactNode } from 'react'

interface GenericTableProps {
    dataTestAttr?: string
    tableFilter?: ReactNode
    tableHeader?: ReactNode
    tableBody?: ReactNode
    tablePagination?: ReactNode
}

export default function GenericTable(props: GenericTableProps) {
    return (
        <Box sx={{ mb: '5rem' }}>
            {props.tableFilter && props.tableFilter}
            {props.tablePagination && props.tablePagination}

            <TableContainer
                component={Paper}
                data-test={props.dataTestAttr}
                data-testid={props.dataTestAttr}
            >
                <Table aria-label="table">
                    {props.tableHeader && props.tableHeader}

                    {props.tableBody && props.tableBody}
                </Table>
            </TableContainer>
        </Box>
    )
}
