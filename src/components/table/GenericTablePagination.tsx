import { TablePagination } from '@mui/material'

export interface TablePaginationData {
    offset: number
    limit: number
    total: number
    onChange?: (updateQuery: Record<string, string | undefined>) => void
}

const GenericTablePagination = ({
    offset,
    limit,
    total,
    onChange,
}: TablePaginationData) => {
    const handlePageChange = (newPage: number) => {
        onChange!({
            offset: (newPage * limit).toString(),
        })
    }

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        onChange!({
            limit: newRowsPerPage.toString(),
            offset: undefined,
        })
    }

    return (
        <TablePagination
            component="div"
            data-test="table-pagination"
            count={total}
            rowsPerPage={limit}
            page={offset / limit}
            onPageChange={(event, newPage) => {
                handlePageChange(newPage)
            }}
            onRowsPerPageChange={(event) => {
                handleRowsPerPageChange(Number(event.target.value))
            }}
        />
    )
}

export default GenericTablePagination
