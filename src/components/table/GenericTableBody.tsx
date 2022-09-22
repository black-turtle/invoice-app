import ViewListIcon from '@mui/icons-material/ViewList'
import { TableBody } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import CustomMenu, { MenuActionData } from '../CustomMenu'
import CustomSkeleton from '../loader/CustomSkeleton'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        // padding: '0px 5px 0px 5px',
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))
const rowHoverStyle = {
    '&:hover': {
        backgroundColor: (theme: any) => theme.palette.action.selected,
        cursor: 'pointer',
    },
}

export interface TableRowData {
    rowKey: string | number
    rowUrl?: string
    // data: Record<string, string | number | undefined>
    data: Record<
        string,
        {
            value: string | number | undefined
            dataTestAttr?: string
        }
    >
    actions?: {
        dataTestAttr?: string
        data: MenuActionData[]
    }
}

const EmptyTableBody = ({
    colSpan,
    rows,
}: {
    rows: TableRowData[] | null
    colSpan: number
}) => {
    return (
        <TableBody>
            <StyledTableRow>
                <StyledTableCell rowSpan={5} colSpan={colSpan} align="center">
                    {!rows && <CustomSkeleton cnt={3} isTable />}
                    {rows?.length === 0 && (
                        <img
                            src="/images/no-data.png"
                            alt="empty-table"
                            style={{ height: '30vh' }}
                            data-test="empty-placeholder"
                            data-testid="empty-placeholder"
                        />
                    )}
                </StyledTableCell>
            </StyledTableRow>
        </TableBody>
    )
}

const GenericTableBody = ({
    rows,
    headerKeys,
    rowClickAction,
}: {
    rows: TableRowData[] | null
    headerKeys: string[]
    rowClickAction?: (newPath?: string | undefined) => void
}) => {
    if (!rows || rows.length === 0) {
        return <EmptyTableBody rows={rows} colSpan={headerKeys.length + 1} />
    }

    return (
        <TableBody>
            {rows.map((row, rowIdx) => (
                <StyledTableRow
                    key={row.rowKey}
                    data-test={row.rowKey}
                    sx={{ ...(row.rowUrl && rowHoverStyle) }}
                    onClick={() => rowClickAction && rowClickAction(row.rowUrl)}
                >
                    {headerKeys.map((key, colIdx) => (
                        <StyledTableCell
                            key={key}
                            component="th"
                            scope="row"
                            align={colIdx > 0 ? 'right' : 'left'}
                            data-test={row.data[key]?.dataTestAttr}
                        >
                            {row.data[key]?.value}
                        </StyledTableCell>
                    ))}

                    {row.actions && (
                        <StyledTableCell align="right">
                            <CustomMenu
                                header={<ViewListIcon />}
                                actions={row.actions.data}
                                dataTestAttr={row.actions.dataTestAttr}
                            />
                        </StyledTableCell>
                    )}
                </StyledTableRow>
            ))}
        </TableBody>
    )
}

export default GenericTableBody
