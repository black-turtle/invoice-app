import { FaFileInvoiceDollar, FaRegEdit } from 'react-icons/fa'
import { ClientListData } from '../api/clientApis'
import { TableRowData } from '../components/table/GenericTableBody'
import { TableHeaderLabelData } from '../components/table/GenericTableHeader'
import { convertToCurrency } from './convertUtils'

export const ClientsTableHeaders: Record<string, TableHeaderLabelData> = {
    clientName: {
        label: 'Name',
        isSortable: true,
    },
    companyName: {
        label: 'Company',
        isSortable: true,
    },
    email: {
        label: 'email',
    },
    totalBilled: {
        label: 'Total Billed',
        isSortable: true,
    },
    invoicesCount: {
        label: '# of Invoices',
        isSortable: true,
    },
}

export const convertToClientsRowData = (
    clients: ClientListData[],
    navigateTo: (newPath?: string | undefined) => void,
) => {
    return clients.map((row) => {
        const rowData: TableRowData = {
            rowKey: `client-row-${row.id}`,
            rowUrl: `/clients/${row.id}`,

            data: {
                clientName: {
                    value: row.name,
                    dataTestAttr: 'client-name',
                },
                companyName: {
                    value: row.companyDetails?.name,
                    dataTestAttr: 'client-companyName',
                },
                totalBilled: {
                    value: convertToCurrency(row.totalBilled),
                    dataTestAttr: 'client-totalBilled',
                },
                invoicesCount: {
                    value: row.invoicesCount,
                    dataTestAttr: 'client-invoicesCount',
                },
            },

            actions: {
                dataTestAttr: 'client-actions',
                data: [
                    {
                        Icon: <FaRegEdit />,
                        text: 'Edit',
                        onClick: () => navigateTo(`/clients/${row.id}`),
                    },
                    {
                        Icon: <FaFileInvoiceDollar />,
                        text: 'Create invoice',
                        onClick: () =>
                            navigateTo(`/invoices/new?clientId=${row.id}`),
                    },
                ],
            },
        }

        return rowData
    })
}
