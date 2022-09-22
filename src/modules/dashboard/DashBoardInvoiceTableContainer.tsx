import { Container } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { loadInvoices } from '../../api/invoiceApis'
import GenericTable from '../../components/table/GenericTable'
import GenericTableBody from '../../components/table/GenericTableBody'
import GenericTableHeader from '../../components/table/GenericTableHeader'
import TableTitleSection from '../../components/table/TableTitleSection'
import { useAsync } from '../../hooks/useAsync'
import useNavigate from '../../hooks/useNavigate'
import {
    convertToTableRowData,
    InvoiceTableHeaders,
} from '../../utils/InvoiceTableUtil'

const DashboardInvoiceTableContainer = () => {
    const { status, execute, data, error } = useAsync(loadInvoices)
    const { navigateTo } = useNavigate()

    // load latest invoice data
    useEffect(() => {
        execute({
            offset: 0,
            limit: 10,
            sort: 'desc',
            sortBy: 'creation',
        })
    }, [execute])

    const rowData = useMemo(
        () => (data ? convertToTableRowData(data.invoices, navigateTo) : null),
        [data, navigateTo],
    )

    return (
        <Container sx={{ my: '1.5rem' }}>
            <TableTitleSection
                title="Latest Invoices"
                buttons={[
                    {
                        label: 'All Invoices',
                        onClick: () => navigateTo('/invoices'),
                        dataTestAttr: 'view-all-invoices',
                    },
                    {
                        label: 'New Invoice',
                        onClick: () => navigateTo('/invoices/new'),
                        dataTestAttr: 'add-invoice',
                    },
                ]}
            />

            <GenericTable
                dataTestAttr="invoices-table"
                tableHeader={
                    <GenericTableHeader
                        headers={InvoiceTableHeaders}
                        rowActionRequired
                    />
                }
                tableBody={
                    <GenericTableBody
                        headerKeys={Object.keys(InvoiceTableHeaders)}
                        rows={rowData}
                        rowClickAction={navigateTo}
                    />
                }
            />
        </Container>
    )
}

export default DashboardInvoiceTableContainer
