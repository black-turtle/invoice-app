import { Container } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { loadInvoices } from '../../../api/invoiceApis'
import GenericTable from '../../../components/table/GenericTable'
import GenericTableBody from '../../../components/table/GenericTableBody'
import GenericTableHeader from '../../../components/table/GenericTableHeader'
import GenericTablePagination from '../../../components/table/GenericTablePagination'
import TableTitleSection from '../../../components/table/TableTitleSection'
import { useAsync } from '../../../hooks/useAsync'
import useNavigate from '../../../hooks/useNavigate'
import { useClientNamesStore } from '../../../stores/useClientNamesStore'
import { DynamicServerErrorComponent } from '../../../utils/commonDynamicComponentUtils'
import {
    convertToTableRowData,
    InvoiceTableHeaders,
} from '../../../utils/InvoiceTableUtil'
import InvoiceCompanyNameFilter from './InvoiceCompanyNameFilter'

const InvoicesTableContainer = () => {
    const { execute, data, error } = useAsync(loadInvoices)
    const { routerQuery, updateRouterQuery, navigateTo, router } = useNavigate()
    const {
        loadClientNames,
        getCompanyNamesList,
        getCompanyName,
        getClientId,
    } = useClientNamesStore()

    // initial load
    useEffect(() => {
        loadClientNames()
    }, [loadClientNames])

    // extract parameters from routerQuery
    const offset = Number(routerQuery?.offset) || 0
    const limit = Number(routerQuery?.limit) || 10
    const sort = routerQuery?.sort === 'desc' ? 'desc' : 'asc'
    const sortBy = routerQuery?.sortBy as string
    const clientId = routerQuery?.clientId as string

    // execute load invoice in query params change
    useEffect(() => {
        execute({ offset, limit, sort, sortBy, clientId })
    }, [clientId, execute, limit, offset, sort, sortBy])

    const rowData = useMemo(
        () => (data ? convertToTableRowData(data.invoices, navigateTo) : null),
        [data, navigateTo],
    )

    if (error) {
        return <DynamicServerErrorComponent />
    }

    return (
        <Container sx={{ my: '1.5rem' }}>
            <TableTitleSection
                title="Invoices"
                buttons={[
                    {
                        label: 'Create New Invoice',
                        onClick: () => navigateTo('/invoices/new'),
                        dataTestAttr: 'add-invoice',
                    },
                ]}
                backButtonAction={() => navigateTo('/')}
            />

            <GenericTable
                dataTestAttr="invoices-table"
                tableFilter={
                    <InvoiceCompanyNameFilter
                        // re-mount when companyName is loaded
                        key={`${clientId}-${getCompanyName(clientId)}`}
                        onChange={(companyName) =>
                            updateRouterQuery({
                                clientId: getClientId(companyName),
                            })}
                        companyNameList={getCompanyNamesList()}
                        defaultCompany={getCompanyName(clientId)}
                    />
                }
                tableHeader={
                    <GenericTableHeader
                        headers={InvoiceTableHeaders}
                        sortEnabled
                        sort={sort}
                        sortBy={sortBy}
                        onSortChangeAction={(updateQuery) =>
                            updateRouterQuery(updateQuery)}
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
                tablePagination={
                    <GenericTablePagination
                        offset={offset}
                        limit={limit}
                        total={data?.total ?? 0}
                        onChange={(updateQuery) =>
                            updateRouterQuery(updateQuery)}
                    />
                }
            />
        </Container>
    )
}

export default InvoicesTableContainer
