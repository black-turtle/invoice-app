import { ComponentMeta } from '@storybook/react'
import GenericTable from '../components/table/GenericTable'
import GenericTableBody from '../components/table/GenericTableBody'
import GenericTableHeader from '../components/table/GenericTableHeader'
import GenericTablePagination from '../components/table/GenericTablePagination'
import { Empty, Loading, WithData } from './GenericTableBody.stories'
import {
    NormalTableHeader,
    SortableTableHeader,
} from './GenericTableHeader.stories'
import { TablePagination } from './GenericTablePagination.stories'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Table',
    component: GenericTable,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof GenericTable>

const createTable = (headerData: any, bodyData: any, paginationData: any) => {
    return (
        <GenericTable
            tableHeader={<GenericTableHeader {...headerData} />}
            tableBody={<GenericTableBody {...bodyData} />}
            tablePagination={<GenericTablePagination {...paginationData} />}
        />
    )
}

export const LoadingTable = () =>
    createTable(NormalTableHeader.args, Loading.args, TablePagination.args)

export const EmptyTable = () =>
    createTable(NormalTableHeader.args, Empty.args, TablePagination.args)

export const WithDataTable = () =>
    createTable(SortableTableHeader.args, WithData.args, TablePagination.args)
