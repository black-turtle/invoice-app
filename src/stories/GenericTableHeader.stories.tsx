import { ComponentMeta, ComponentStory } from '@storybook/react'
import GenericTable from '../components/table/GenericTable'
import GenericTableHeader from '../components/table/GenericTableHeader'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Table/GenericTableHeader',
    component: GenericTableHeader,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof GenericTableHeader>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GenericTableHeader> = (args) => (
    <GenericTable tableHeader={<GenericTableHeader {...args} />} />
)

export const NormalTableHeader = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NormalTableHeader.args = {
    headers: {
        h1: { label: 'h1' },
        h2: { label: 'h2' },
        h3: { label: 'h3' },
        h4: { label: 'h4' },
        h5: { label: 'h5' },
    },
}

export const SortableTableHeader = Template.bind({})
SortableTableHeader.args = {
    headers: {
        h1: { label: 'h1', isSortable: true },
        h2: { label: 'h2', isSortable: true },
        h3: { label: 'h3' },
        h4: { label: 'h4' },
        h5: { label: 'h5' },
    },
    sortEnabled: true,
    sort: 'asc',
    sortBy: 'h1',
    rowActionRequired: true,
}
