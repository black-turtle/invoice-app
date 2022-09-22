import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { LOADING_SKELETON_TEST_ID } from '../../components/loader/CustomSkeleton'

import GenericTable from '../../components/table/GenericTable'
import GenericTableBody, {
    TableRowData,
} from '../../components/table/GenericTableBody'
import GenericTableHeader from '../../components/table/GenericTableHeader'
import GenericTablePagination from '../../components/table/GenericTablePagination'

// Constants
const dataTestAttr = 'test-table'

const headerData = {
    header_1: {
        label: 'header_1',
        dataTestAttr: 'header_1',
    },
    header_2: {
        label: 'header_2',
        dataTestAttr: 'header_2',
    },
}

// table body data
const commonTableBodyData = {
    headerKeys: ['header_1', 'header_2'],
    rowClickAction: (url: string | undefined) =>
        console.log('navigate to ' + url),
}
const loadingTableBodyData = {
    rows: null,
    ...commonTableBodyData,
}

const emptyTableBodyData = {
    rows: [],
    ...commonTableBodyData,
}

const tableBodyData = {
    rows: [
        {
            rowKey: 'row-key',
            rowUrl: 'row-url',
            data: {
                header_1: {
                    value: 'data_1',
                    dataTestAttr: 'data_1_test',
                },
                header_2: {
                    value: 'data_2',
                    dataTestAttr: 'data_2_test',
                },
            },
        },
    ] as TableRowData[],
    ...commonTableBodyData,
}

describe('Test GenericTable', () => {
    test('Check table has exact data-test attribute', () => {
        render(<GenericTable dataTestAttr={dataTestAttr} />)
        expect(screen.getByTestId(dataTestAttr)).toBeInTheDocument()
    })

    test('test table loading state when data=null', () => {
        render(
            <GenericTable
                dataTestAttr={dataTestAttr}
                tableBody={<GenericTableBody {...loadingTableBodyData} />}
            />,
        )
        expect(screen.getByTestId(LOADING_SKELETON_TEST_ID)).toBeInTheDocument()
    })

    test('Check empty placeholder present if data = []', () => {
        render(
            <GenericTable
                dataTestAttr={dataTestAttr}
                tableBody={<GenericTableBody {...emptyTableBodyData} />}
            />,
        )
        expect(screen.getByTestId('empty-placeholder')).toBeInTheDocument()
    })

    test('Check all table data displayed properly if row data present', () => {
        render(
            <GenericTable
                dataTestAttr={dataTestAttr}
                tableBody={<GenericTableBody {...tableBodyData} />}
            />,
        )

        // check every data key present
        tableBodyData.rows.forEach((row) => {
            Object.keys(row.data).forEach((colData) => {
                expect(
                    screen.getByText(row.data[colData].value as string),
                ).toBeInTheDocument()
            })
        })
    })

    test('test tableHeader displaying expected result', () => {
        render(
            <GenericTable
                dataTestAttr={dataTestAttr}
                tableHeader={<GenericTableHeader headers={headerData} />}
            />,
        )

        // check header label displayed
        expect(screen.getByText('header_2')).toBeInTheDocument()

        // check header testId present
        expect(screen.getByTestId('header_2')).toBeInTheDocument()
    })

    test('test table Pagination displaying expected results', () => {
        render(
            <GenericTable
                dataTestAttr={dataTestAttr}
                tablePagination={
                    <GenericTablePagination offset={0} limit={10} total={100} />
                }
            />,
        )

        expect(screen.getByText('1–10 of 100')).toBeInTheDocument()
    })

    test('Full Snapshot test', async () => {
        const { container } = render(
            <GenericTable dataTestAttr={dataTestAttr} />,
        )

        expect(container).toMatchSnapshot()
    })
})
