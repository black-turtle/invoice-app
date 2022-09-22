import { Table } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import GenericTableBody from '../components/table/GenericTableBody'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Table/GenericTableBody',
    component: GenericTableBody,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof GenericTableBody>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GenericTableBody> = (args) => (
    <Table style={{ width: '80vw' }}>
        <GenericTableBody {...args} />
    </Table>
)

export const Loading = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Loading.args = {
    rows: null,
    headerKeys: ['h1', 'h2', 'h3', 'h4', 'h5'],
}

export const Empty = Template.bind({})
Empty.args = {
    rows: [],
    headerKeys: ['h1', 'h2', 'h3', 'h4', 'h5'],
}

export const WithData = Template.bind({})
WithData.args = {
    rows: [
        {
            rowKey: 1,
            data: {
                h1: { value: 'd1' },
                h2: { value: 'd2' },
                h3: { value: 'd3' },
                h4: { value: 'd4' },
                h5: { value: 'd5' },
            },
            actions: {
                data: [
                    {
                        text: 'action 1',
                        onClick: () => alert('action 1 clicked'),
                    },
                    {
                        text: 'action 2',
                        onClick: () => alert('action 2 clicked'),
                    },
                ],
            },
        },
        {
            rowKey: 2,
            data: {
                h1: { value: 'd12' },
                h2: { value: 'd22' },
                h3: { value: 'd32' },
                h4: { value: 'd42' },
                h5: { value: 'd52' },
            },
            actions: {
                data: [
                    {
                        text: 'action 1',
                        onClick: () => alert('action 1 clicked'),
                    },
                    {
                        text: 'action 2',
                        onClick: () => alert('action 2 clicked'),
                    },
                ],
            },
        },
    ],
    headerKeys: ['h1', 'h2', 'h3', 'h4', 'h5'],
}
