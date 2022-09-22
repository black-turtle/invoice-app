import { FaPrint, FaRegEdit } from 'react-icons/fa'
import { InvoiceWithClientDetails } from '../api/invoiceApis'
import { TableRowData } from '../components/table/GenericTableBody'
import { TableHeaderLabelData } from '../components/table/GenericTableHeader'
import { convertToCurrency, convertToDate } from './convertUtils'

export const InvoiceTableHeaders: Record<string, TableHeaderLabelData> = {
    invoice: {
        label: 'Invoice',
        dataTestAttr: 'invoice-header',
    },
    projectCode: {
        label: 'Project',
        dataTestAttr: 'projectCode-header',
    },
    companyName: {
        label: 'company',
        isSortable: true,
        dataTestAttr: 'companyName-header',
    },
    date: {
        label: 'Date',
        isSortable: true,
        dataTestAttr: 'date-header',
    },
    dueDate: {
        label: 'Due Date',
        isSortable: true,
        dataTestAttr: 'dueDate-header',
    },
    price: {
        label: 'Value',
        isSortable: true,
        dataTestAttr: 'price-header',
    },
}

export const convertToTableRowData = (
    invoices: InvoiceWithClientDetails[],
    navigateTo: (newPath?: string | undefined) => void,
) => {
    return invoices.map((row) => {
        const rowData: TableRowData = {
            rowKey: `invoice-row-${row.invoice.id}`,
            rowUrl: `/invoices/${row.invoice.id}`,

            data: {
                invoice: {
                    value: row.invoice.invoice_number,
                    dataTestAttr: 'invoice-number',
                },
                companyName: {
                    value: row.client.companyDetails?.name,
                    dataTestAttr: 'invoice-company',
                },
                date: {
                    value: convertToDate(row.invoice.date),
                    dataTestAttr: 'invoice-date',
                },
                dueDate: {
                    value: convertToDate(row.invoice.dueDate),
                    dataTestAttr: 'invoice-dueDate',
                },
                projectCode: {
                    value: row.invoice.projectCode,
                    dataTestAttr: 'invoice-project',
                },
                price: {
                    value: convertToCurrency(row.invoice.value),
                    dataTestAttr: 'invoice-price',
                },
            },

            actions: {
                dataTestAttr: 'invoice-actions',
                data: [
                    {
                        Icon: <FaRegEdit />,
                        text: 'Edit',
                        onClick: () =>
                            navigateTo(`/invoices/${row.invoice.id}`),
                        dataTestAttr: 'edit-action',
                    },
                    {
                        Icon: <FaPrint />,
                        text: 'Print',
                        onClick: () =>
                            navigateTo(
                                `/invoices/${row.invoice.id}/view?print=true`,
                            ),
                        dataTestAttr: 'print-action',
                    },
                ],
            },
        }
        return rowData
    })
}
