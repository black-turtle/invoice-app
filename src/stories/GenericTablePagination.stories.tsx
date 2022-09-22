import { ComponentMeta, ComponentStory } from '@storybook/react'
import GenericTable from '../components/table/GenericTable'
import GenericTablePagination from '../components/table/GenericTablePagination'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Table/GenericTablePagination',
    component: GenericTablePagination,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof GenericTablePagination>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GenericTablePagination> = (args) => (
    <GenericTable tablePagination={<GenericTablePagination {...args} />} />
)

export const TablePagination = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TablePagination.args = {
    offset: 10,
    limit: 10,
    total: 50,
}
