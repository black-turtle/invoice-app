import {
    styled,
    TableCell,
    tableCellClasses,
    TableHead,
    TableRow,
    TableSortLabel,
    tableSortLabelClasses,
    Typography,
} from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
}))

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
    [`& .${tableSortLabelClasses.icon}`]: {
        color: `${theme.palette.common.white} !important`,
    },
}))

export interface TableHeaderLabelData {
    label: string
    isSortable?: boolean
    dataTestAttr?: string
}

export interface TableHeaderData {
    headers: Record<string, TableHeaderLabelData>
    sortEnabled?: boolean
    sort?: 'asc' | 'desc'
    sortBy?: string
    rowActionRequired?: boolean
    onSortChangeAction?: (
        updateQuery: Record<string, string | undefined>,
    ) => void
}

const GenericTableHeader = (props: TableHeaderData) => {
    const changeSortDirection = (newSortBy: string) => {
        let { sort, sortBy } = props
        if (newSortBy === sortBy) {
            sort = sort === 'asc' ? 'desc' : 'asc'
        }
        props.onSortChangeAction!({
            sortBy: newSortBy,
            sort,
            offset: undefined,
        })
    }

    const { headers, rowActionRequired, sort, sortBy, sortEnabled } = props
    return (
        <TableHead>
            <TableRow>
                {Object.keys(headers).map((key, idx) => (
                    <StyledTableCell
                        key={`header-${key}`}
                        align={idx > 0 ? 'right' : 'left'}
                        data-test={headers[key].dataTestAttr}
                        data-testid={headers[key].dataTestAttr}
                    >
                        {/* Apply sort label only if sortEnabled and row is sortable  */}
                        {sortEnabled && headers[key].isSortable && (
                            <StyledTableSortLabel
                                sx={{ color: 'azure !important' }}
                                active={key === sortBy}
                                direction={key === sortBy ? sort : undefined}
                                onClick={() => changeSortDirection(key)}
                            >
                                {headers[key].label}
                            </StyledTableSortLabel>
                        )}

                        {!(sortEnabled && headers[key].isSortable) && (
                            <Typography sx={{ cursor: 'not-allowed' }}>
                                {headers[key].label}
                            </Typography>
                        )}
                    </StyledTableCell>
                ))}
                {rowActionRequired && <StyledTableCell />}
            </TableRow>
        </TableHead>
    )
}

export default GenericTableHeader
