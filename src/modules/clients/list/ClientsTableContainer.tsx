import { Container } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { loadClientsGraphQl } from '../../../api/clientApis'
import GenericTable from '../../../components/table/GenericTable'
import GenericTableBody from '../../../components/table/GenericTableBody'
import GenericTableHeader from '../../../components/table/GenericTableHeader'
import GenericTablePagination from '../../../components/table/GenericTablePagination'
import TableTitleSection from '../../../components/table/TableTitleSection'
import { useAsync } from '../../../hooks/useAsync'
import useNavigate from '../../../hooks/useNavigate'
import {
    ClientsTableHeaders,
    convertToClientsRowData,
} from '../../../utils/ClientsTableUtil'
import { DynamicServerErrorComponent } from '../../../utils/commonDynamicComponentUtils'

const ClientsTableContainer = () => {
    const { execute, data, error } = useAsync(loadClientsGraphQl)
    const { routerQuery, updateRouterQuery, navigateTo, router } = useNavigate()
    // extract parameters from routerQuery
    const offset = Number(routerQuery?.offset) || 0
    const limit = Number(routerQuery?.limit) || 10
    const sort = routerQuery?.sort === 'desc' ? 'desc' : 'asc'
    const sortBy = routerQuery?.sortBy as string

    useEffect(() => {
        execute(routerQuery)
    }, [execute, routerQuery])

    const rowData = useMemo(
        () => (data ? convertToClientsRowData(data.clients, navigateTo) : null),
        [data, navigateTo],
    )

    if (error) {
        return <DynamicServerErrorComponent />
    }

    return (
        <Container sx={{ my: '1.5rem' }}>
            <TableTitleSection
                title="Latest Clients"
                buttons={[
                    {
                        label: 'New Client',
                        onClick: () => navigateTo('/clients/new'),
                        dataTestAttr: 'add-client',
                    },
                ]}
                backButtonAction={() => navigateTo('/')}
            />

            <GenericTable
                dataTestAttr="clients-table"
                tableHeader={
                    <GenericTableHeader
                        headers={ClientsTableHeaders}
                        sortEnabled
                        sort={sort}
                        sortBy={sortBy}
                        rowActionRequired
                        onSortChangeAction={(updateQuery) =>
                            updateRouterQuery(updateQuery)}
                    />
                }
                tableBody={
                    <GenericTableBody
                        headerKeys={Object.keys(ClientsTableHeaders)}
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

export default ClientsTableContainer
