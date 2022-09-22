import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const ClientsTableHeaders = {
    clientName: {
        label: 'Name',
    },
    companyName: {
        label: 'Company',
    },
    totalBilled: {
        label: 'Total Billed',
    },
    invoicesCount: {
        label: '# of Invoices',
    },
}

interface StoreValues {}

interface StoreActions {}

interface Store extends StoreValues, StoreActions {}

const defaultValues: StoreValues = {}

export const useClientListStore = create<Store>()(
    devtools(
        immer((set, get) => ({
            ...defaultValues,

            reset: () => set(defaultValues),
        })),
        { name: 'ClientListStore' },
    ),
)
