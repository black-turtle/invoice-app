import { Container } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { loadClientsGraphQl } from '../../api/clientApis'
import GenericTable from '../../components/table/GenericTable'
import GenericTableBody from '../../components/table/GenericTableBody'
import GenericTableHeader from '../../components/table/GenericTableHeader'
import TableTitleSection from '../../components/table/TableTitleSection'
import { useAsync } from '../../hooks/useAsync'
import useNavigate from '../../hooks/useNavigate'
import {
    ClientsTableHeaders,
    convertToClientsRowData,
} from '../../utils/ClientsTableUtil'

const DashboardClientsTableContainer = () => {
    const { status, execute, data, error } = useAsync(loadClientsGraphQl)
    const { navigateTo } = useNavigate()

    useEffect(() => {
        execute({ offset: 0, limit: 10, sort: 'desc', sortBy: 'creation' })
    }, [execute])

    const rowData = useMemo(
        () => (data ? convertToClientsRowData(data.clients, navigateTo) : null),
        [data, navigateTo],
    )

    return (
        <Container sx={{ my: '1.5rem' }}>
            <TableTitleSection
                title="Latest Clients"
                buttons={[
                    {
                        label: 'All Clients',
                        onClick: () => navigateTo('/clients'),
                        dataTestAttr: 'view-all-clients',
                    },
                    {
                        label: 'New Client',
                        onClick: () => navigateTo('/clients/new'),
                        dataTestAttr: 'add-client',
                    },
                ]}
            />

            <GenericTable
                dataTestAttr="clients-table"
                tableHeader={
                    <GenericTableHeader
                        headers={ClientsTableHeaders}
                        rowActionRequired
                    />
                }
                tableBody={
                    <GenericTableBody
                        headerKeys={Object.keys(ClientsTableHeaders)}
                        rows={rowData}
                        rowClickAction={navigateTo}
                    />
                }
            />
        </Container>
    )
}

export default DashboardClientsTableContainer
